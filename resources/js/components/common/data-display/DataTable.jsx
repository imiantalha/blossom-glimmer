import EmptyState from "./EmptyState";

const DataTable = ({
    columns = [],
    data = [],
}) => {
    return (
        <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

                <thead className="table-light">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {data.length === 0 ? (

                        <tr>
                            <td colSpan={columns.length}>
                                <EmptyState
                                    title="No users found"
                                    description="There are no users to display."
                                />
                            </td>
                        </tr>

                    ) : (

                        data.map((row) => (

                            <tr key={row.id}>

                                {columns.map((column) => (

                                    <td key={column.key}>
                                        {column.render
                                            ? column.render(row)
                                            : row[column.key]}
                                    </td>

                                ))}

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default DataTable;