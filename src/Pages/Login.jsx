import React, { useState } from 'react';
import freshcartlogo from '../assets/freshcartlogo.svg';
import signing from '../assets/signing.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


function Login() {

  let [logindata, setlogindata] = useState([])
 let go= useNavigate()


  let inputvalue = (e) => {
    setlogindata(
      { ...logindata, [e.target.name]: e.target.value }
    )
  }



  let loginbtn = () => {
    axios.post("https://freshcart1-backend.vercel.app/login", { logindata }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Login Success !",
          icon: "success"
        })

        let user=res.data.logedin
        
        localStorage.setItem("logedin",JSON.stringify(user))


        go("/home")
      }

      else {
        Swal.fire({
          icon: "error",
          title: "User Not Found .. ",
        });
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <img src={freshcartlogo} alt="LOGO" className="w-36" />
        <div className="text-sm text-gray-700">
          Already have an account? <span className="font-semibold text-green-600">Sign in</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-around px-6 py-10">
        {/* Left Side Image */}
        <div className="hidden md:block w-1/2">
          <img src={signing} alt="SIGN-IN-PIC" className="w-full max-w-md mx-auto" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in to FreshCart</h1>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back to FreshCart! Enter your email to get started.
          </p>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              onChange={inputvalue}
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="relative">
              <input
                type="password"
                name="password"
                onChange={inputvalue}
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FontAwesomeIcon icon={faEyeSlash} className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgetpassword" className="text-green-600 hover:underline">Forgot Password?</Link>
          </div>

          {/* Sign In Button */}
          <button onClick={loginbtn}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account? <Link to="/signup" className="text-green-600 font-semibold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
// This code defines a React component for a login page with a responsive layout.
// It includes a navbar, a form for email and password input, and links for sign-up and password recovery.