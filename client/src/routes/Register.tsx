import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Ensure this is imported if it's used

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Delay for the transition effect
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset any previous errors

    try {
      const formData = new FormData(e.currentTarget);
      const formObject = Object.fromEntries(formData.entries()) as {
        username: string;
        email: string;
        password: string;
      };
      const { username, email, password } = formObject;

      if (!username || !email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false); // Stop loading indicator
        return; // Prevent form submission
      }

      const registerUser = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      });

      if (registerUser.status === 201) {
        console.log("User registered successfully");
        // Optionally, redirect to login page or show success message
        navigate("/login");
      }

    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div className="login_container h-full flex flex-col justify-center items-center bg-light-gradient-6">
      <div className="container w-3/4 flex h-full">
        <div className="imageContainer w-full h-1/3">
          <img
            src="/background1.jpg"
            className={`w-full md:w-full md:h-1/2 object-contain shadow-2xl rounded-xl transition-transform duration-1000 ease-out ${
              isVisible
                ? "-translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            } hidden md:block`}
            alt="Register Illustration"
          />
        </div>

        <div className="formContainer w-1/2 flex justify-center items-center">
          <form
            className="flex flex-col gap-6 w-full md:w-2/3 max-w-md bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleRegister}
          >
            <h1 className="font-bold text-2xl text-center">
              Create an Account
            </h1>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="p-3 border border-solid border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="p-3 border border-solid border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-3 border border-solid border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="bg-teal-700 p-3 text-white font-bold w-full rounded-md hover:bg-teal-800 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <NavLink to="/login" className="text-center">
              <button className="text-teal-700 font-bold w-full rounded-md hover:text-teal-800 transition duration-300">
                Already have an account?
              </button>
            </NavLink>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
