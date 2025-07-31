import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productimg13 from "../assets/productimg13.jpg"
import { FaTrashAlt } from "react-icons/fa"
import productimg17 from "../assets/productimg17.jpg"
import productimg18 from "../assets/productimg18.jpg"
import productimg19 from "../assets/productimg19.jpg"
import axios from "axios";
import Swal from "sweetalert2";


function Wishlist() {


  let [wishlist, setwishlist] = useState([])

  useEffect(() => {
    wishlistitem()
  }), []


  let wishlistitem = () => {
    axios.get("https://freshcart-backend-9t2w.vercel.app/wishlistproduct").then((res) => {
      if (res.data.status) {
        setwishlist(res.data.wishlistproduct)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  


    //deleteproduct--------------

  let deleteproduct = (item) => {
    

    Swal.fire({
      title: "Are you sure ?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post("https://freshcart-backend-9t2w.vercel.app/deletewishlistproduct", item).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Delete Product !",
            icon: "success",
          });


          setTimeout(function groot(){
          window.location.reload()
          }, 3000)

        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    });
  };




// addtocart---------------

  let cart = (item) => {

    // axios.post("https://freshcart-backend-9t2w.vercel.app/cart", {a })
    axios.post("https://freshcart-backend-9t2w.vercel.app/cart", { cartitem: item })

    .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "addtocart Success !",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };




  return (
    <div className="p-8">
      <div className="text-sm breadcrumbs text-green-600">
        <ul className="flex gap-2">
          <li><a href="#">Home</a></li>
          <li><a href="#">Shop</a></li>
          <li className="text-gray-600">Shop Wishlist</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mt-4">My Wishlist</h1>
      <p className="text-gray-600 mb-6">There are {wishlist.length} products in this wishlist.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4"><input type="checkbox" /></th>
              <th className="p-4">Product</th>
              <th className="p-4">Product Category</th>

              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 flex items-center gap-4">
                  <img src={item.Productimage} alt={item.Producttitle} className="w-12 h-12 object-contain" />
                  <div>
                    <div className="font-semibold">{item.Producttitle}</div>
                    <div className="text-sm text-gray-500">{item.Productweight}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{item.Productcategory}</td>
                <td className="p-4 text-gray-700">{item.Saleprice}</td>
                <td className="p-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">In Stock</span>
                </td>
                <td className="p-4 text-gray-700">
                  <button className="bg-green-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-green-700" onClick={() => cart(item)}>
                    Add to cart
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button className="text-gray-500 hover:text-red-500" onClick={() => deleteproduct(item)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
