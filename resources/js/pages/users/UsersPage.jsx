import PageHeader from "../../components/common/layout/PageHeader";
import Card from "../../components/common/data-display/Card";
import Button from "../../components/common/form/Button";
import Input from "../../components/common/form/Input";
import DataTable from "../../components/common/data-display/DataTable";

import useUsers from "../../hooks/useUsers";

const UsersPage = () => {

    const {
        users,
        loading,
        error,
        search,
        setSearch,
    } = useUsers();

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
            render: (user) => user.roles.join(", "),
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
                    <Button
                        size="sm"
                        className="me-2"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <PageHeader
                title="Users"
                subtitle="Manage all system users."
                breadcrumb={[
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                    },
                    {
                        label: "Users",
                    },
                ]}
            />

            <Card className="shadow-sm border-0">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div style={{ width: "350px" }}>
                        <Input
                            type="search"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            iconLeft={
                                <i className="bi bi-search"></i>
                            }
                        />
                    </div>

                    <Button>
                        <i className="bi bi-plus-lg me-2"></i>
                        Create User
                    </Button>

                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

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