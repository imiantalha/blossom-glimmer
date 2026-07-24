export default function Dashboard() {
    return (
        <>
            <h2>
                Dashboard
            </h2>

            <hr />

            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            Users
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            Roles
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            Products
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}