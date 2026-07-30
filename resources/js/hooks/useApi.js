import { useState, useCallback } from "react";

const useApi = (apiFunction) => {
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const execute = useCallback(
        async (...params) => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiFunction(...params);

                return response;
            } catch (err) {
                setError(
                    err.response?.data?.message ??
                    "Something went wrong."
                );

                throw err;
            } finally {
                setLoading(false);
            }
        },
        [apiFunction]
    );

    return {
        loading,
        error,
        execute,
    };
};

export default useApi;