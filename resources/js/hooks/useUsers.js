import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useApi from "./useApi";
import userService from "../services/user.service";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    const {
        loading,
        error,
        execute,
    } = useApi(userService.getUsers);

    const updateSearch = (value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        params.delete("page");

        setSearchParams(params);
    };

    const updatePage = (value) => {
        const params = new URLSearchParams(searchParams);

        if (value === 1) {
            params.delete("page");
        } else {
            params.set("page", String(value));
        }

        setSearchParams(params);
    };

    const fetchUsers = async (
        currentPage = page,
        keyword = search
    ) => {
        const response = await execute({
            page: currentPage,
            search: keyword,
        });

        setUsers(response.data.data);
        setPagination(response.data.pagination);

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
        search,

        setSearch: updateSearch,
        setPage: updatePage,

        loading,
        error,

        refresh: fetchUsers,
    };
};

export default useUsers;