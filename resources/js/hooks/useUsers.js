import { useEffect, useState } from "react";

import useApi from "./useApi";
import userService from "../services/user.service";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

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