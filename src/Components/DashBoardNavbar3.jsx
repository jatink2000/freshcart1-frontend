import React from 'react'
import { Link } from 'react-router-dom';



function DashBoardNavbar3(){
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
      {/* Left: Title and Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-sm text-gray-500">
          <span className="text-gray-800 font-medium"> <Link to="/dashboard">Dashboard</Link> </span> <span className="text-gray-800 font-medium"> <Link to="/DashBoard/DashBoardProduct" > / Products </Link> </span>   / Edit Product
        </p>
      </div>

      {/* Right: Add Product Button */}
      
      <button
       className="bg-white-600 text-black px-5 py-2 rounded hover:bg-gray-300 font-semibold">
       <Link 
       to="/DashBoard/DashBoardProduct"
       >
        Back to Product
      </Link>

      </button>
    </div>
  );
};

export default DashBoardNavbar3;