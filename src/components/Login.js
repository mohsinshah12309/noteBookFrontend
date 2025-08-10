import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const {showAlert}=props;
  console.log(showAlert);
  const [credentials, setCredentials] = useState({ 
    email: "", 
    password: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!credentials.email || !credentials.password) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch("https://my-notebook-backend-green.vercel.app/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password
        })
      });

      // Check for HTTP errors first
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.authToken);
         props.showAlert("Successfully Logged in ","success");
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Redirect to home
        navigate("/", { replace: true });
      } else {
        props.showAlert("Invalid username or password ","danger");
      }
    } catch (error) {
      console.error("Login error details:", {
        error: error.toString(),
        credentials
      });
      setError(error.message || "Login service unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="mt-3 my-3">
        <h2>Login to NoteBook</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                  <button 
                    type="button" 
                    className="btn-close float-end" 
                    onClick={() => setError("")}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    minLength={5}
                    autoComplete="current-password"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span 
                        className="spinner-border spinner-border-sm me-2" 
                        role="status" 
                        aria-hidden="true"
                      ></span>
                      Authenticating...
                    </>
                  ) : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
