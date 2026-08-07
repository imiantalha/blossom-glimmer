import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useApi from "./useApi";
import userService from "../services/user.service";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = useMemo(() => {
        return Number(searchParams.get("page")) || 1;
    }, [searchParams]);

    const search = useMemo(() => {
        return searchParams.get("search") || "";
    }, [searchParams]);

    const {
        loading,
        error,
        execute,
    } = useApi(userService.getUsers);

    const fetchUsers = async (page = page, keyword = search) => {
        const response = await execute({
            page,
            search: keyword,
        });

        setUsers(response.data.data);
        setPagination(response.data.pagination);
        setPage(response.data.pagination.current_page);

        return response.data;
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers(page, search);
        }, 900);

        return () => clearTimeout(timeout);
    }, [page, search]);

    return {
        users,
        pagination,
        page,
        setPage,
        search,
        setSearch,
        loading,
        error,
        refresh: fetchUsers,
    };
};

export default useUsers;