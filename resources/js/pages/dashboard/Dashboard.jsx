import PageHeader from "../../components/common/layout/PageHeader";
import StatCard from "../../components/common/data-display/StatCard";

import Loader from "../../components/common/feedback/Loader";
import Alert from "../../components/common/feedback/Alert";

import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {

    const {
        statistics,
        loading,
        error,
    } = useDashboard();

    if (loading) {

        return (
            <Loader message="Loading dashboard..." />
        );

    }

    return (

        <>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome back to Blossom Glimmer."
            />

            <Alert
                variant="danger"
                message={error}
            />

            <div className="row">

                <StatCard
                    title="Users"
                    value={statistics.users}
                    icon="bi bi-people-fill"
                />

                <StatCard
                    title="Roles"
                    value={statistics.roles}
                    icon="bi bi-shield-lock-fill"
                    color="success"
                />

                <StatCard
                    title="Permissions"
                    value={statistics.permissions}
                    icon="bi bi-key-fill"
                    color="warning"
                />

                <StatCard
                    title="Request Logs"
                    value={statistics.request_logs}
                    icon="bi bi-file-earmark-text-fill"
                    color="danger"
                />

            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">

                    <h5 className="fw-bold">
                        Recent Activity
                    </h5>

                    <p className="text-muted mb-0">
                        Activity feed will be available soon.
                    </p>

                </div>
            </div>
        </>

    );
};

export default Dashboard;