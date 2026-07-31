import { useState } from "react";

import PageHeader from "../../components/common/layout/PageHeader";
import Card from "../../components/common/data-display/Card";
import Button from "../../components/common/form/Button";
import Input from "../../components/common/form/Input";
import DataTable from "../../components/common/data-display/DataTable";

const UsersPage = () => {
    const [search, setSearch] = useState("");

    const loading = false;

    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "roles",
            label: "Roles",
        },
        {
            key: "created_at",
            label: "Created At",
        },
        {
            key: "actions",
            label: "Actions",
            render: (user) => (
                <>
                    <button className="btn btn-sm btn-primary me-2">
                        Edit
                    </button>

                    <button className="btn btn-sm btn-danger">
                        Delete
                    </button>
                </>
            ),
        },
    ];

    const users = [
        {
            id: 1,
            name: "Muhammad Talha",
            email: "talha@example.com",
            role: "Admin",
            created_at: "31 Jul 2026",
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@example.com",
            role: "User",
            created_at: "30 Jul 2026",
        },
    ];

    return (
        <>
            <PageHeader
                title="Users"
                subtitle="Manage all system users."
                breadcrumb={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Users" }
                ]}
            />

            <Card className="shadow-sm border-0">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div style={{ width: "350px" }}>
                        <Input
                            type="search"
                            value={search}
                            placeholder="Search users..."
                            onChange={(e) => setSearch(e.target.value)}
                            iconLeft={<i className="bi bi-search"></i>}
                        />
                    </div>

                    <Button>
                        <i className="bi bi-plus-lg me-2"></i>
                        Create User
                    </Button>

                </div>

                <DataTable 
                    columns={columns}
                    data={users}
                    loading={loading}
                />

            </Card>

        </>
    );
};

export default UsersPage;