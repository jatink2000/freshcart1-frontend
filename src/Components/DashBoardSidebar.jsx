import React from "react";
import {
  FaHome,
  FaBox,
  FaList,
  FaShoppingBag,
  FaUsers,
  FaStar,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import DashBoardProduct from "../Pages/DashBoardProduct";

function DashBoardSidebar(){
  return (
    <div className="w-64 bg-white shadow h-screen p-4 flex flex-col gap-2 border-r dashboardnav">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700 mb-6">
        <span className="text-3xl">🛒</span> FreshCart
      </h2>

      <div>
        <button className="flex items-center w-full gap-3 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold">
          <FaHome /> Dashboard
        </button>
      </div>

      <p className="text-gray-400 text-sm mt-4 mb-1 px-4">Store Managements</p>
      <nav className="flex flex-col gap-1">
        <Link
          to="/DashBoard/DashBoardProduct"
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700"
        >
          <FaBox /> Products
        </Link>
        {/* <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700">
          <FaList /> Categories
        </button> */}

        <Link 
        to="/DashBoard/DashBoardOrder"
        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700">
          <FaShoppingBag /> Orders
        </Link>

        {/* <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700">
          🧑🏽‍💼 Sellers / Vendors
        </button> */}

      
      <Link
      to="/DashBoard/DashboardCustomer"
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded bg-gray-100 font-semibold"
      >
          <FaUsers /> Customers
      </Link>


        <Link
        to="/DashBoard/DashboardReview"
        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700"
        >

          <FaStar /> Reviews
        

        </Link>
        
        <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded text-gray-700">
          <FaBars /> Menu Level
        </button>
      </nav>
    </div>
  );
};

export default DashBoardSidebar;