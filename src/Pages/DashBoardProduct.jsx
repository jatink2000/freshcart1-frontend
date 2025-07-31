import React, { useEffect, useState } from "react";
import DashBoardSidebar from "../Components/DashBoardSidebar";
import DashBoardNavbar from "../Components/DashBoardNavbar";
import DashboardHeader from "../Components/DashboardHeader";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

function DashBoardProduct() {
  let [Products, setProducts] = useState([]);

  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    apidata();
  }, []);

  let apidata = () => {
    axios
      .get("https://freshcart-backend-9t2w.vercel.app/products")
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.dataproduct);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Agar click kisi menu button ya dropdown par nahi hua to close menu
      if (!event.target.closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);




  //deleteproduct--------------

  let deleteproduct = (product) => {
    

    Swal.fire({
      title: "Are you sure ?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post("https://freshcart-backend-9t2w.vercel.app/deleteproduct", product).then((res) => {
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



  //Editproduct--------------

   let go = useNavigate()
  let edititem=(product)=>{
    go("/Editproduct",{state:product})
  }


  

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashBoardSidebar />
      <main className="flex-1 p-4">
        <DashboardHeader />
        <DashBoardNavbar />

        <div className="overflow-x-auto mt-6 rounded-xl shadow-sm">
          <table className="min-w-full bg-white border rounded-xl text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">
                  <input type="checkbox" />
                </th>
                <th className="p-4">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                {/* <th className="p-4">Create at</th> */}
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>
                  <td className="p-4">
                    <img
                      src={product.Productimage}
                      alt={product.Producttitle}
                      className="w-10 h-10 object-contain"
                    />
                  </td>
                  <td className="p-4 text-gray-800">{product.Producttitle}</td>
                  <td className="p-4 text-gray-600">
                    {product.Productcategory}
                  </td>
                  <td className="p-4">
                    {product.status === "Active" ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                        Draft
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-medium">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-800">${product.Saleprice}</td>
                  {/* <td className="p-4 text-gray-600">{product.date}</td> */}
                  <td className="p-4 relative">
                    {/* <button className="text-gray-400 hover:text-black text-xl">⋮</button> */}

                    <div className="menu-container relative inline-block">
                      {/* 3 Dots Button */}
                      <button
                        onClick={() => toggleMenu(product._id)}
                        className="text-gray-600 hover:text-black text-xl p-2 focus:outline-none"
                      >
                        ⋮
                      </button>

                      {/* Dropdown menu */}
                      {openMenuId === product._id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-100 w-full"
                             onClick={() => edititem(product)}
                            // onClick={() => console.log("Edit", product._id)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
                            onClick={() => deleteproduct(product)}
                            // onClick={() => console.log("Delete", product._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default DashBoardProduct;
