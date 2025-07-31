import React, { useState } from 'react';
import forgetpasswordpic from '../assets/forgetpasswordpic.svg';
import freshcartlogo from '../assets/freshcartlogo.svg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {


  let [resetpassword, setresetpassword] = useState([])
  let go= useNavigate()


  let inputvalue = (e) => {
    setresetpassword(
      { ...resetpassword, [e.target.name]: e.target.value }
    )
  }


  let resetbtn = () => {
    if (resetpassword.password == resetpassword.confirmpassword) {
      axios.post("https://freshcart-backend-9t2w.vercel.app/resetpassword", { resetpassword }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Reset password success",
            icon: "success"
          });
           go("/")
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Not a User  .. ",
          });
          go("/signup")
        }
      }).catch((err) => {
        console.log(err)
      })

    }
    else {
      alert("password not same")
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <img src={freshcartlogo} alt="LOGO" className="w-36" />
        <div className="text-sm text-gray-700">
          Already have an account?{' '}
          <span className="font-semibold text-green-600 hover:underline cursor-pointer">Sign in</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-12">
        {/* Left Image */}
        <div className="hidden md:block w-1/2 max-w-md">
          <img src={forgetpasswordpic} alt="Forget Password" className="w-full" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot your password?</h1>
          <p className="text-sm text-gray-600 mb-6">
            Please enter the email address associated with your account. We’ll send you a reset link.
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              onChange={inputvalue}
              name='email'
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          <div className="mb-4">
            <input
              type="Password"
              onChange={inputvalue}
              name='password'
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          <div className="mb-4">
            <input
              type="Password"
              onChange={inputvalue}
              name='confirmpassword'
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>



          {/* Buttons */}
          <button
            onClick={resetbtn}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Reset Password
          </button>

          <button
            type="submit"
            className="w-full bg-gray-100 text-black py-2 rounded hover:bg-gray-300 transition duration-200 mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;