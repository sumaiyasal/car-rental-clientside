import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authprovide";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import registerLottieData from "../assets/Animation - 1747041860348.json";

const Signup = () => {
  const { createUser, setUser, loginwithgoogle } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    loginwithgoogle()
      .then(result => {
        const { displayName, email, photoURL, metadata } = result.user;
        const createdAt = metadata?.creationTime;
        const newUser = { displayName, email, createdAt, photo: photoURL };
        setUser(result.user);

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire({
                title: 'Success!',
                text: 'Successfully Signed In',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              navigate(location?.state || "/");
            }
          });
      })
      .catch(errorr => {
        setError(prev => ({ ...prev, login: errorr.message }));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const errors = {};
    if (displayName.length < 5) {
      errors.displayName = "Name should be at least 5 characters.";
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      errors.password = "Include uppercase, lowercase, number, and special character.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    createUser(email, password)
      .then(result => {
        const createdAt = result.user?.metadata?.creationTime;
        const newUser = { displayName, email, createdAt, photo };
        setUser({ displayName, email, photo });

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire({
                title: 'Success!',
                text: 'Successfully Signed Up',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              navigate(location?.state || "/");
            }
          });
      })
      .catch(erroor => {
        setError(prev => ({ ...prev, register: erroor.message }));
      });
  };

  return (
    <div className="dark:bg-[#202020] dark:text-white pt-24 bg-slate-100">
      <div className="min-h-full flex flex-1 justify-between items-center lg:px-20 px-10 py-10">
        <Lottie animationData={registerLottieData} className="w-2/5 hidden lg:block" />
        
        <div className="card bg-base-100 w-full max-w-lg p-10">
          <h2 className="text-2xl font-semibold text-center mb-4">Register your account</h2>
          
          <form onSubmit={handleSubmit} className="card-body border p-4 rounded-lg space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="input input-bordered"
                required
              />
              {error.displayName && (
                <span className="text-red-500 text-sm mt-1">{error.displayName}</span>
              )}
            </div>

            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='btn btn-xs absolute right-2 top-11'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {error.password && (
                <span className="text-red-500 text-sm mt-1">{error.password}</span>
              )}
            </div>

            {error.register && (
              <p className="text-red-500 text-sm">{error.register}</p>
            )}

            {/* Buttons */}
            <div className="form-control mt-6 space-y-2">
              <button className="btn btn-neutral rounded-xl">Sign Up</button>
              <button
                type="button"
                className="btn bg-[#3ea5e0] text-white rounded-xl"
                onClick={handleGoogleSignIn}
              >
                Sign Up with Google
              </button>
            </div>
          </form>

          {/* Login redirect */}
          <p className="text-center font-semibold mt-4">
            Already have an account?{" "}
            <Link className="text-red-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
