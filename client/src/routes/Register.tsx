import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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
        setIsLoading(false);
        return;
      }

      const registerUser = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      });

      if (registerUser.status === 201) {
        console.log("User registered successfully");
        navigate("/login");
      }

    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-slate-800 p-6">
      <div className="container w-full flex h-full p-10">
        <div className="imageContainer w-1/2 h-full">
          <img
            src="/care2.png"
            className={`w-full h-full object-cover shadow-2xl rounded-xl transition-transform duration-1000 ease-out ${
              isVisible ? "-translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } hidden md:block`}
            alt="Register Illustration"
          />
        </div>

        <div className="formContainer w-1/2 flex justify-center items-center">
          <form
            className="flex flex-col gap-6 w-full md:w-2/3 max-w-md p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-300"
            onSubmit={handleRegister}
            style={{
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)",
            }}
          >
            <h1 className="font-bold text-2xl text-center text-white">Create an Account</h1>
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
    </div>
  );
}

export default Register;
