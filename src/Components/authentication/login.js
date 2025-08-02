import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";




const Login = () => {
  
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://api.fremikecnsult.com/api/login", // Laravel API endpoint
        { email: data.email, password: data.password },

        {
          headers: { Accept: "application/json" },
        }
      );

      const result = response.data;

      if (result.token) {
        // Store token and user details in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.name); // Adjust as per your user object
        localStorage.setItem("role", result.user.role); // Adjust as per your user object

        // Navigate based on user role
        const roleRoutes = {
          Admin: "/dashboard",
          Branch: "/branch",
          User: "/user", // default fallback
        };

        const userRole = result.user.role;
        const path = roleRoutes[userRole] || "/user-dashboard"; // fallback if role not found
        navigate(path);
      } else {
        toast.error(result.message || "Login failed.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        { position: "top-right" }
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "1") {
      toast.success("Your email has been successfully verified!");
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-sm-6 col-12">
            <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="border rounded-2 p-4 mt-5">
                <div className="login-form">
                  <Link to="index.html" className="mb-4 d-flex">
                    <img
                      src="assets/images/logo.svg"
                      className="img-fluid login-logo"
                      alt="Earth Admin Dashboard"
                    />
                  </Link>
                  <h5 className="fw-light mb-5">
                    Sign in to access dashboard.
                  </h5>
                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <input
                      type="text"
                      className={`form-control${
                        errors.email ? " is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                      name="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Password</label>
                    <input
                      type="password"
                      className={`form-control${
                        errors.password ? " is-invalid" : ""
                      }`}
                      placeholder="Enter password"
                      name="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <Link
                      to="/request-reset"
                      className="text-blue text-decoration-underline"
                    >
                      Lost password?
                    </Link>
                  </div>
                  <div className="d-grid py-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center">
                          <ClipLoader color="#fff" size={20} />
                          <span className="ms-2">Loging in...</span>
                        </span>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <div className="text-center pt-4">
                    <span>Not registered?</span>
                    <Link
                      to="/signup"
                      className="text-blue text-decoration-underline ms-2"
                    >
                      SignUp
                    </Link>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
