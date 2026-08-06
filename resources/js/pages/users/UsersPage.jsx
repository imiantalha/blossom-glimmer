import PageHeader from "../../components/common/layout/PageHeader";
import Card from "../../components/common/data-display/Card";
import Button from "../../components/common/form/Button";
import Input from "../../components/common/form/Input";
import DataTable from "../../components/common/data-display/DataTable";
import Pagination from "../../components/common/navigation/Pagination";

import useUsers from "../../hooks/useUsers";

const UsersPage = () => {
    const {
        users,
        pagination,
        page,
        setPage,
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
                <div className="d-flex gap-2">
                    <Button size="sm">
                        <i className="bi bi-pencil-square"></i>
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                    >
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
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

                    <div
                        className="d-flex align-items-center gap-2"
                        style={{ width: "350px" }}
                    >
                        <div className="flex-grow-1">
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

                        {loading && (
                            <div
                                className="spinner-border spinner-border-sm text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        )}
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
                />

                {pagination && (
                    <Pagination
                        currentPage={page}
                        lastPage={pagination.last_page}
                        onPageChange={setPage}
                    />
                )}

            </Card>
        </>
    );
};

export default UsersPage;