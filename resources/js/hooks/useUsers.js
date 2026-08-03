import { useEffect, useState } from "react";

import useApi from "./useApi";
import userService from "../services/user.service";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null);

    const {
        loading,
        error,
        execute,
    } = useApi(userService.getUsers);

    const fetchUsers = async (page = 1, keyword = search) => {
        const response = await execute({
            page,
            search: keyword,
        });

        setUsers(response.data.data);
        setPagination(response.data.pagination);

        return response.data;
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers(1, search);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    return {
        users,
        pagination,
        search,
        setSearch,
        loading,
        error,
        refresh: fetchUsers,
    };
};

export default useUsers;