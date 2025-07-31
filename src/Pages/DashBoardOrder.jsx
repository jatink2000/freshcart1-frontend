import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidebar from "../Components/DashBoardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashBoardNavbar from "../Components/DashBoardNavbar";

const DashBoardOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://freshcart-backend-9t2w.vercel.app/allcartitem");
      if (res.data.status) {
        setCartItems(res.data.ourcartitem);
        const total = res.data.ourcartitem.reduce(
          (acc, item) => acc + item.Saleprice * item.Productquantity,
          0
        );
        setOrderTotal(total);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-[250px] border-r border-gray-200">
        <DashBoardSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="px-6 pt-4">
          <DashBoardNavbar />
        </div>

        <div className="flex-1 overflow-auto px-6 pb-10">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-full mt-6">
            {/* Order ID and Status */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Order ID: <span className="text-blue-600">#FC001</span>
                <span className="ml-3 text-yellow-600 text-sm font-medium">Pending</span>
              </h2>
              <div>
                <button className="bg-green-600 text-white px-4 py-1 rounded mr-2 hover:bg-green-700">
                  Save
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded">
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Customer and Shipping Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">Customer Details</h3>
                <p className="font-medium">John Alex</p>
                <p className="text-sm text-gray-600">anderalex@example.com</p>
                <p className="text-sm text-gray-600">+998 99 22123456</p>
                <p className="text-green-600 text-sm mt-1 underline cursor-pointer">
                  View Profile
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                <p className="font-medium">Gerg Harvell</p>
                <p>568, Suite Ave..</p>
                <p>Austrlia, 235153</p>
                <p className="text-sm text-gray-600">Contact No. +91 99999 12345</p>
              </div>
            </div>

            {/* Product Table */}
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b text-sm text-gray-500">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 flex items-center gap-3">
                        <img
                          src={item.Productimage}
                          alt={item.Producttitle}
                          className="w-10 h-10 rounded object-cover border"
                        />
                        <span>{item.Producttitle}</span>
                      </td>
                      <td className="py-3">${item.Saleprice}</td>
                      <td className="py-3">{item.Productquantity}</td>
                      <td className="py-3">
                        ${(item.Saleprice * item.Productquantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="text-right mt-6 text-lg font-semibold">
              Order Total: <span className="text-black">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOrder;
