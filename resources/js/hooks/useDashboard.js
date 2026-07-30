import { useEffect, useState } from "react";

import dashboardService from "../services/dashboard.service";
import useApi from "./useApi";

const useDashboard = () => {
    const [statistics, setStatistics] = useState({
        users: 0,
        roles: 0,
        permissions: 0,
        request_logs: 0,
    });

    const {
        loading,
        error,
        execute,
    } = useApi(dashboardService.statistics);

    const fetchStatistics = async () => {
        const response = await execute();

        setStatistics(response.data);
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    return {
        statistics,
        loading,
        error,
        refresh: fetchStatistics,
    };
};

export default useDashboard;