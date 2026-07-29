import PageHeader from "../../components/common/layout/PageHeader";
import StatCard from "../../components/common/data-display/StatCard";

const Dashboard = () => {
    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Welcome back to Blossom Glimmer."
            />

            <div className="row">

                <StatCard
                    title="Users"
                    value={25}
                    icon="bi bi-people-fill"
                    color="primary"
                />

                <StatCard
                    title="Roles"
                    value={5}
                    icon="bi bi-shield-lock-fill"
                    color="success"
                />

                <StatCard
                    title="Permissions"
                    value={42}
                    icon="bi bi-key-fill"
                    color="warning"
                />

                <StatCard
                    title="Request Logs"
                    value={1250}
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