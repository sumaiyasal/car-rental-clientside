import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authprovide";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import registerLottieData from"../assets/Animation - 1747041860348.json"
const Signup = () => {
  const { createUser, setUser,user, updateUserProfile,loginwithgoogle } = useContext(AuthContext);
  const [error, setError] = useState({});  
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleSignIn = () => {
  
    loginwithgoogle()
        .then(result => {
        
        //  console.log(result.user.displayName);
        //  console.log(result.user.email);
        //  console.log('user created at fb', result.user);
      const createdAt = result?.user?.metadata?.creationTime;
      setUser(result.user);
      const displayName=result?.user?.displayName;
      const email=result?.user?.email;
      const photo=result?.user?.photoURL;
      const newUser = {displayName,email, createdAt,photo }
      console.log(displayName, email, createdAt)
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
      })
          .then(res => res.json())
          .then(data => {
              
              if(data.insertedId){
                  console.log('user created in db')
                    Swal.fire({
                      title: 'Success!',
                      text: 'Successfully Signed In',
                      icon: 'success',
                      confirmButtonText: 'Ok'
                  });
  
               
              }
          })

        navigate(location?.state ? location.state : "/");
        })
        .catch((errorr) => {
            setError({ ...error, login: errorr.code });
          });
}

  const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(user);
      

        const form = new FormData(e.target);
    const displayName= form.get("name");
   
    if (displayName.length < 5) {
      setError({ ...error, displayName: "name should be more then 5 character"});
      return;
    }
    console.log(error.displayName);
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
   
    
    if (password.length < 6) {
      setError({ ...error, password: "Password should be 6 characters or longer" });
      return;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            
            setError({ ...error, password: "At least one uppercase, one lowercase, one number, one special character" });
            return;
        }
    createUser(email, password)
    .then((result) => {
      console.log('user created at fb', result.user);
      const createdAt = result?.user?.metadata?.creationTime;
      setUser({displayName,email,photo});
      const newUser = { displayName, email, createdAt,photo }
      console.log(displayName, email, createdAt)
      fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
      })
          .then(res => res.json())
          .then(data => {
              
              if(data.insertedId){
                  console.log('user created in db')
               
                    Swal.fire({
                      title: 'Success!',
                      text: 'Successfully Signed In',
                      icon: 'success',
                      confirmButtonText: 'Ok'
                  });
  
               
              }
          })

        navigate(location?.state ? location.state : "/");
    })
    .catch((erroor) => {
      console.log(erroor);
  
    });
  }
    return (
        <div className="bg-[#202020]">
          
           <div className="min-h-full flex justify-between gap-10 items-center px-20 py-10">
           <Lottie animationData={registerLottieData} className="w-2/5"></Lottie>
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body border-2 p-4 rounded-lg my-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          {error.displayName && (
            <label className="label text-sx text-red-500">{error.displayName}</label>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photo-url"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs absolute right-2 top-12'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
            {error.password && (
            <label className="label text-sx text-red-500">{error.password}</label>
          )}
          </div>
          {error.register && <label className="label">{error.register}</label>}

          <div className="form-control mt-6">
          <button className="btn btn-neutral rounded-xl mb-2">Sign Up</button>
          <button className="btn bg-[#3ea5e0] rounded-xl text-white" onClick={handleGoogleSignIn}>Sign Up with Google</button>
          </div>
        </form>
        
        <p className="text-center font-semibold">
          Allready Have An Account ?{" "}
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