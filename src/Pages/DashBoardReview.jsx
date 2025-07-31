import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidebar from "../Components/DashBoardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashBoardNavbar from "../Components/DashBoardNavbar";
import { FaStar } from "react-icons/fa";

const DashboardReview = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://freshcart1-backend.vercel.app/allreview");
      if (res.data.status) {
        setReviews(res.data.ourreview);
      }
    } catch (err) {
      console.error("Review API error:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://freshcart1-backend.vercel.app/products");
      if (res.data.status) {
        setProducts(res.data.dataproduct);
      }
    } catch (err) {
      console.error("Product API error:", err);
    }
  };

  const getProductName = (productid) => {
    const product = products.find((item) => item._id === productid);
    return product ? product.Producttitle : "Unknown Product";
  };

  const filterreview = selectedProductId
    ? reviews.filter((item) => item.productid === selectedProductId)
    : reviews;

  return (
    <div className="flex">
      <DashBoardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <DashBoardNavbar />

        <div className="p-6 bg-gray-100 min-h-screen">
          <h2 className="text-xl font-semibold mb-4">Review Dashboard</h2>

          {/* Dropdown to filter reviews by product */}
          <div className="mb-6">
            <label className="font-medium mr-2">Filter by Product:</label>
            <select
              className="p-2 border rounded"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.Producttitle}
                </option>
              ))}
            </select>
          </div>

          {/* Table format */}
          <div className="overflow-x-auto bg-white shadow rounded-lg mb-12">
            <table className="min-w-full text-sm text-left">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4"><input type="checkbox" /></th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Reviews</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">...</th>
                </tr>
              </thead>
              <tbody>
                {filterreview.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="px-4 py-3 font-medium">{getProductName(item.productid)}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.review?.slice(0, 40)}...</td>
                    <td className="px-4 py-3 text-yellow-500 flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{item.date || "23 Nov,2022"}</td>
                    <td className="px-4 py-3 text-right">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View */}
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col-reverse md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/2">
                <div className="p-4 max-w-xl mx-auto">
                  <h1 className="font-extrabold text-2xl mb-1">Reviews</h1>
                  <p className="text-gray-600 mb-4">
                    {filterreview.length} Review{filterreview.length > 1 ? "s" : ""}
                  </p>

                  {filterreview.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className="w-10 h-10 rounded-full mr-3 text-white uppercase flex items-center justify-center"
                          style={{ backgroundColor: "#28a745" }}
                        >
                          {item.reviewername?.[0] || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.reviewername}</p>
                          <p className="text-sm text-gray-500">{getProductName(item.productid)}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{item.reviewtext}"</p>
                      <div className="flex items-center gap-1 mt-2 text-yellow-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* You can place additional sections here if needed */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardReview;
