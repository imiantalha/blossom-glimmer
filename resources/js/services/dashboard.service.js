import api from "../api/axios";

const dashboardService = {
    async statistics() {
        const response = await api.get("/dashboard");

        return response.data;
    },
};

export default dashboardService;