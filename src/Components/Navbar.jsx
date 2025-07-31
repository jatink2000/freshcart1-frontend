import React, { useEffect, useState } from "react";
import freshcartlogo from '../assets/freshcartlogo.svg';
import english from '../assets/english.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

import {
  faMagnifyingGlass,
  faLocationDot,
  faHeart,
  faUser,
  faShoppingBag,
  faFile,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Navbar(){

    let [wishlist, setwishlist] = useState([])

  useEffect(() => {
    wishlistitem()
  }), []


  let wishlistitem = () => {
    axios.get("https://freshcart1-backend.vercel.app/wishlistproduct").then((res) => {
      if (res.data.status) {
        setwishlist(res.data.wishlistproduct)
      }
    }).catch((err) => {
      console.log(err)
    })
  }



  let [cartItems, setCartItems] = useState([])

  useEffect(() => {
    addtocartitem()
  }), []


  let addtocartitem = () => {
    axios.get("https://freshcart1-backend.vercel.app/allcartitem").then((res) => {
      if (res.data.status) {
        setCartItems(res.data.ourcartitem)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  

  let loginuser=JSON.parse(localStorage.getItem("logedin"))
  let username=(loginuser.firstname)
  console.log()
  
  return (
    <div className="w-full text-gray-700 font-sans">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>Super Value Deals - Save more with coupons</p>
          <div className="flex items-center gap-2">
            <span className="text-xl"><img src={english} alt="UK" /></span>
            <select className="bg-transparent outline-none cursor-pointer">
              <option>English</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="py-4 px-4 border-b">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          {/* Logo */}
          <img src={freshcartlogo} alt="FreshCart" className="w-32" />

          {/* Search */}
          <div className="flex flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-white border border-l-0 border-gray-300 px-4 py-2 rounded-r-md">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>

          {/* Location */}
          <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md text-gray-600">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            Location
          </button>

          {/* Icons */}
          <div className="flex items-center gap-6 text-xl">
            {/* Wishlist */}

            <Link to={"/wishlistpage"}>
              <div className="relative cursor-pointer text-gray-600 hover:text-red-500">
              <FontAwesomeIcon icon={faHeart} />
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            </div>
            </Link>

            

            {/* Profile */}
            <div className="cursor-pointer text-gray-600 hover:text-blue-500">
                <p className='userfirstname'>{username.at(0)}</p>
                {/* <FontAwesomeIcon icon={faUser}/> */}
            </div>

            {/* Cart */}

            <Link to={"/addtocartpage"}>
              <div className="relative cursor-pointer text-gray-600 hover:text-green-600">
              <FontAwesomeIcon icon={faShoppingBag} />
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </div>
            </Link>
            
          </div>
        </div>
      </div>

{/* Bottom Bar */}
<div className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-4 text-sm font-medium items-center">

    <div className="relative group">
      <button className="bg-green-500 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm">
        <span className="text-lg">▦</span>
        All Departments
      </button>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-48 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Dairy, Bread & Eggs</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Snacks and Munchies</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Fruits and Vegetables</li>
      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Home</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home Default</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home Modern</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home Creative</li>
      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Shop</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Default</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Modern</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Creative</li>
      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Store</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQ</li>
      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Mega menu</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQ</li>
      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Pages</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Single</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Category</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About Us</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">404 error</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li>

      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600">Account</span>
      <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-1 w-44 shadow-md text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Signin</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Signup</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Forget Password</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>

      </ul>
    </div>

    <div className="relative group">
      <span className="cursor-pointer hover:text-green-600"> <Link to="/dashboard">Dashboard</Link>  </span>
    </div>

<div className="relative group">
  <span className="cursor-pointer hover:text-green-600 font-medium text-sm">Docs</span>

  {/* Dropdown Menu */}
  <ul className="absolute z-10 hidden group-hover:block bg-white border rounded-md mt-2 w-60 shadow-lg text-gray-700 text-sm">
    
    {/* Documentation */}
    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
      <div className="flex items-start gap-3">
        <FontAwesomeIcon icon={faFile} className="text-green-500 text-lg mt-1" />
        <div>
          <p className="font-semibold">Documentation</p>
          <p className="text-xs text-gray-500">Browse all the documentation</p>
        </div>
      </div>
    </li>

    {/* Change Log */}
    <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
      <div className="flex items-start gap-3">
        <FontAwesomeIcon icon={faLayerGroup} className="text-green-500 text-lg mt-1" />
        <div>
          <p className="font-semibold">Changelog v1.0.0</p>
          <p className="text-xs text-gray-500">See what's new in the release</p>
        </div>
      </div>
    </li>

  </ul>
</div>



  </div>
</div>

    </div>
  );
};

export default Navbar;