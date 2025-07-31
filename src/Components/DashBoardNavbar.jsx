import React from 'react'
import { Link } from 'react-router-dom';



function DashBoardNavbar(){
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
      {/* Left: Title and Breadcrumb */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <p className="text-sm text-gray-500">
          <span className="text-gray-800 font-medium">Dashboard</span> / Products
        </p>
      </div>

      {/* Right: Add Product Button */}
      
      <button
       className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-semibold">
       <Link 
       to="/DashBoard/Addproduct"
       >
        Add Product
      </Link>

      </button>
    </div>
  );
};

export default DashBoardNavbar;