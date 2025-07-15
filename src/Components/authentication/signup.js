import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register",
      {
        name: data.fullname,
        email: data.email,
        role: data.role,
        password: data.password,
        password_confirmation: data.confirmPassword,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      toast.success(response.data.message, { position: "top-right" });
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  } catch (error) {
    setLoading(false);
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      Object.values(errors).forEach((messages) => {
        toast.error(messages[0], { position: "top-right" });
      });
    } else {
      toast.error("An unexpected error occurred!", { position: "top-right" });
    }
  }
};


  return (
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
                <h5 className="fw-light mb-5">Create your admin account.</h5>

                <div className="mb-3">
                  <label className="form-label">Fullname</label>
                  <input
                    type="text"
                    className={`form-control${ errors.fullname ? " is-invalid" : ""}`}
                    placeholder="Enter fullname"
                    name="fullname"
                    {...register("fullname", {
                      required: "Full name is required",
                    })}
                  />
                  <p className="text-danger">{errors.fullname?.message}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Your Email</label>
                  <input
                    type="text"
                    className={`form-control${
                      errors.email ? " is-invalid" : ""
                    }`}
                    placeholder="Enter email"
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
                  <label className="form-label">Role</label>
                  <select
                    className={`form-select${errors.role ? " is-invalid" : ""}`}
                    name="role"
                    {...register("role", {
                      required: "Role is required",
                    })}
                  >
                    <option value="">-Select role-</option>
                    <option value="Admin">Super Admin</option>
                    <option value="Branch">Branch Admin</option>
                    <option value="User">User</option>

                 
                  </select>
                  <p className="text-danger">{errors.role?.message}</p>
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
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control${
                      errors.confirmPassword ? " is-invalid" : ""
                    }`}
                    placeholder="Re-enter password"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
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
                        <span className="ms-2">loading...</span>
                      </span>
                    ) : (
                      "Signup"
                    )}
                  </button>
                </div>

                <div className="text-center pt-4">
                  <span>Already have an account?</span>
                  <Link
                    to="/login"
                    className="text-blue text-decoration-underline ms-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
