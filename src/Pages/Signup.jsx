import React, { useState } from 'react';
import signup from '../assets/signup.svg';
import freshcartlogo from '../assets/freshcartlogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function SignUp() {

  let [signupdata, setsignupdata] = useState([])

  let go=useNavigate()

  let inputvalue = (e) => {
    setsignupdata(
      { ...signupdata, [e.target.name]: e.target.value }
    )
  }


  let signupbtn = () => {
  axios.post("https://freshcart-backend-9t2w.vercel.app/signup", {signupdata} ).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Signup Success !",
          icon: "success"
        });

        go("/")
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
          Already have an account?{' '}
          <span className="font-semibold text-green-600 cursor-pointer hover:underline">Sign in</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-around px-6 py-10">
        {/* Left Image */}
        <div className="hidden md:block w-1/2 max-w-lg">
          <img src={signup} alt="SIGN-UP-PIC" className="w-full" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Get Started Shopping</h1>
          <p className="text-sm text-gray-600 mb-6">
            Welcome to FreshCart! Enter your details to create an account.
          </p>

          {/* Name Inputs */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={inputvalue}
              className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={inputvalue}
              className="w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              onChange={inputvalue}
              name="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              onChange={inputvalue}
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FontAwesomeIcon icon={faEyeSlash} className="absolute right-3 top-3.5 text-gray-400" />
          </div>

          {/* Register Button */}
          <button onClick={signupbtn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By continuing, you agree to our{' '}
            <a href="#" className="text-green-600 hover:underline">Terms of Service</a> &{' '}
            <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
// This code defines a SignUp component for a React application.
// It includes a responsive layout with a navbar, an image on the left, and a form on the right for user registration.