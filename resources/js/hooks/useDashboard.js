import { useEffect, useState } from "react";

import dashboardService from "../services/dashboard.service";

const useDashboard = () => {

    const [statistics, setStatistics] = useState({
        users: 0,
        roles: 0,
        permissions: 0,
        request_logs: 0,
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchStatistics = async () => {

        setLoading(true);

        try {

            const response =
                await dashboardService.statistics();

            setStatistics(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ??
                "Unable to load dashboard."
            );

        } finally {

            setLoading(false);

        }
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