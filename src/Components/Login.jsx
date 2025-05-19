import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Authprovide";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottieData from "../assets/Animation - 1747042517480.json";

const Login = () => {
  const { signInUser, setUser, loginwithgoogle } = useContext(AuthContext);
  const [email, setEmailInput] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    loginwithgoogle()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          title: "Success!",
          text: "Successfully Logged In",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate(location?.state || "/");
      })
      .catch((errorr) => {
        setError({ ...error, login: errorr.message });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Successfully Logged In",
              icon: "success",
              confirmButtonText: "Ok",
            });
            navigate(location?.state || "/");
          });
      })
      .catch((errorr) => {
        setError({ ...error, login: errorr.message });
      });
  };

  return (
    <div className="min-h-screen dark:bg-[#202020] dark:text-white pt-24 bg-slate-100 text-[#202020]] flex items-center justify-center px-6 py-10">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-6xl">
        {/* Login Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Log In to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmailInput(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              {error.login && (
                <p className="text-sm text-red-600 mt-2">{error.login}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <button className="btn btn-neutral w-full rounded-xl">Login</button>
              <button
                type="button"
                className="btn bg-[#4285F4] text-white w-full rounded-xl"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <Lottie animationData={loginLottieData} className="w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Login;
