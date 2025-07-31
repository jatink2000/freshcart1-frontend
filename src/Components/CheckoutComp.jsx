// import React from "react";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom";

function CheckoutComp() {

  let loc = useLocation()
  let cartitem = loc.state



  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios.get("https://freshcart1-backend.vercel.app/alladdresses").then((res) => {
      if (res.data.status) {
        setAddresses(res.data.addresses);
      }
    });
  }, []);



  const totalAmount = cartitem.reduce(
    (acc, item) => acc + item.Saleprice * item.Productquantity,
    0
  );




  

  const handleSubmit = (e) => {
    e.preventDefault();
    var options = {
      key: "rzp_test_zLBz5tT46J6rSB",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: parseInt(totalAmount) * 100,
      currency: "INR",
      name: "FreshCart",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        console.log("paymant id", paymentId, shipping_address);
      },
      theme: {
        color: "#0aad0a",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };






  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>


        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Section - Delivery Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div>

            
               <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2" >
                <span>📍</span> Add delivery address
              </h2> 
             
              {/* Add New Address Button */}
              <Link to={"/Addnewaddress"}>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                + Add a new address
              </button>
              </Link>


                
               <div className="flex gap-4 flex-wrap mt-4">
              {addresses.length === 0 ? (
                <p className="text-sm text-gray-500">No address found</p>
              ) : (
                addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className="bg-white border rounded-lg p-4 w-full sm:w-[48%]"
                  >
                    <p className="font-semibold text-green-600 mb-1">● Home</p>
                    <p className="text-gray-700 text-sm">
                      {addr.firstname} {addr.lastname}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {addr.address1}, {addr.address2}, {addr.city}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      {addr.mobilenumber}
                    </p>
                    <div className="flex gap-3 text-sm text-blue-600 mt-2">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          {/* </div>   */}
               

           



              {/* <div className="flex gap-4 flex-wrap"> */}
                {/* Address Card 1 */}
                {/* <div className="bg-white border rounded-lg p-4 w-full sm:w-[48%]">
                  <p className="font-semibold text-green-600 mb-1">● Home</p>
                  <p className="text-gray-700 text-sm">Jitu Chauhan</p>
                  <p className="text-gray-600 text-sm">
                    4450 North Avenue Oakland, Nebraska, US
                  </p>
                  <p className="text-gray-600 text-sm mb-2">402-776-1106</p>
                  <p className="text-red-500 text-xs">Default address</p> */}
                  {/* <div className="flex gap-3 text-sm text-blue-600 mt-2">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div> */}
                {/* </div> */}

              {/* </div> */}


            </div>

            {/* Payment Method */}
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Payment Method
              </h3>
              <label
                htmlFor="payment"
                className="block mb-1 text-sm text-gray-600"
              >
                Choose your mode of payment{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="payment"
                name="payment"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-2 text-sm"
              >
                <option value="">-- Select Payment Option --</option>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit / Debit Card</option>
                <option value="upi">UPI / QR</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            {/* Place Order Button */}
            <div className="text-right">
              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-green-700" onClick={handleSubmit} >
                🛒 Place Order
              </button>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Order Details
            </h3>

            <div className="space-y-4">
              {/* Item 1 */}


              {cartitem.map((item) => {
                return (
                  <>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.Producttitle}
                        </p>
                        <p className="text-sm text-gray-500">{item.Productquantity} x ${item.Saleprice}</p>
                      </div>
                      <p className="font-semibold text-gray-800">${item.Productquantity * item.Saleprice}</p>
                    </div>

                  </>
                )
              })}





              {/* Total Summary */}
              <div className="pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Grand Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComp;


// delete wishlist :
// add to cart
// cart : display 