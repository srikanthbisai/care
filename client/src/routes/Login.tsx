import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(form.entries());
    const { username, password } = formObject;

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const { token, username: loggedInUsername } = response.data;
      dispatch(login({ username: loggedInUsername, token }));
      navigate("/");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/guest-login",
        {},
        { withCredentials: true }
      );

      const { token, username } = response.data;
      dispatch(login({ username, token }));
      navigate("/");
    } catch (error) {
      setError("Failed to login as guest. Please try again.");
    }
  };

  return (
    <div className="login_container min-h-screen flex flex-col justify-center items-center bg-slate-800 p-6">
      <div className="container w-full flex h-full p-10">
        <div className="imageContainer w-1/2 h-full">
          <img
            src="/medical.webp"
            className={`w-full h-full object-cover shadow-xl rounded-xl transition-transform duration-1000 ease-out ${
              isVisible ? "-translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } hidden md:block`}
            alt="Login Illustration"
          />
        </div>

        <div className="formContainer w-1/2 flex justify-center items-center">
          <form
            className="flex flex-col gap-6 w-full md:w-2/3 max-w-md p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-300"
            onSubmit={handleLogin}
            style={{
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
            }}
          >
            <h1 className="font-bold text-2xl text-center text-white">Login to Your Account</h1>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="p-3 border border-solid border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-3 border border-solid border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-700 p-3 text-white font-bold w-full rounded-md hover:bg-teal-800 transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="bg-gray-500 p-3 text-white font-bold w-full rounded-md hover:bg-gray-600 transition duration-300"
            >
              Login as Guest
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Link to="/register" className="text-center">
              <button className="text-teal-700 font-bold w-full rounded-md hover:text-teal-800 transition duration-300">
                Don't have an account? Sign Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
