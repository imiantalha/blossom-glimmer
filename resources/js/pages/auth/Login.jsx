import logo from "../../assets/images/logo.png";

import AuthCard from "../../components/auth/AuthCard";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
            }}
        >
            <div className="row justify-content-center w-100">
                <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                    <div className="text-center">

                        <img
                            src={logo}
                            alt="Blossom Glimmer"
                            className="img-fluid mb-0"
                        ></img>

                    </div>

                    <AuthCard
                        title="Welcome Back 👋"
                        subtitle="Sign in to continue"
                    >
                        <LoginForm />
                    </AuthCard>
                </div>
            </div>
        </div>
    );
};

export default Login;