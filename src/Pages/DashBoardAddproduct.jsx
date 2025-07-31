import React, { useState } from 'react';
import DashBoardSidebar from "../Components/DashBoardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashBoardNavbar2 from '../Components/DashBoardNavbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashBoardAddProduct() {


    
  let [product, setproduct] = useState([])


  let go = useNavigate()

  let inputvalue = (e) => {
    setproduct(
      { ...product,[e.target.name]: e.target.value }
    )
  }


  let productbtn =()=>{
    // console.log(product)
    axios.post("https://freshcart-backend-9t2w.vercel.app/addproduct", {product}).then((res) => {
      if (res.data.status) {
        alert("add")

        go("/DashBoard/DashBoardProduct")
      }
    }).catch((err) => {
      console.log(err)
    })

  }


  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashBoardSidebar />

      <main className="flex-1 p-4">
        <DashboardHeader />
        <DashBoardNavbar2 />

        <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Add Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              <h3 className="text-gray-700 font-semibold mb-2">Product Information</h3>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Title</label>
                <input type="text" onChange={inputvalue} name='Producttitle' placeholder="Product Name" className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Weight</label>
                <input  onChange={inputvalue}  type="text" placeholder="Weight" name='Productweight' className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Product Images</label>
                <div className="mt-2 ">
                    <input  onChange={inputvalue}
                      name="Productimage"
                      type="text"
                      required
                      className="w-full border px-3 py-2 rounded" 
                    />
                  </div>
                {/* <div className="border-dashed border-2 border-gray-300 rounded p-6 text-center text-gray-400">
                  Drop files here to upload
                </div> */}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Product Description</label>
                <textarea onChange={inputvalue} name="Productdescription" className="w-full border px-3 py-2 rounded min-h-[100px]"  placeholder="Write description..."></textarea>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">In Stock</span>
                <input type="checkbox" className="toggle toggle-success" defaultChecked />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Product Category</label>
                <select className="w-full border px-3 py-2 rounded" onChange={inputvalue} name='Productcategory'>
                  <option>Select Category</option>
                    <option value={"Cold Drinks & Juices"}>Cold Drinks & Juices</option>
                    <option value={"Dairy"}>Dairy</option>
                    <option value={"Snacks"}>Snacks</option>
                    <option value={"Candies & Gums"}>Candies & Gums</option>

                </select>
              </div>
  
          {/* <div>
                <label className="block text-sm text-gray-500 mb-1">Units</label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>Select Units</option>
                </select>
              </div> */}

              <div>
                <label className="block text-sm text-gray-500 mb-1">Product Code</label>
                <input type="text" placeholder="Enter Product Code" className="w-full border px-3 py-2 rounded" />
              </div>

              {/* <div>
                <label className="block text-sm text-gray-500 mb-1">Product SKU</label>
                <input type="text" placeholder="Enter SKU" className="w-full border px-3 py-2 rounded" />
              </div> */}

              {/* <div>
                <label className="block text-sm text-gray-500 mb-1">Product Quantity</label>
                <div className="mt-2">
                    <input  onChange={inputvalue}
                      name="Productquantity"
                      type="number"
                      value={1}
                      required
                      className="w-full border px-3 py-2 rounded" 
                    />
                  </div>
              </div> */}


               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  quantity:
                </label>
                <select className="border border-green-400 rounded-lg px-4 py-2 w-full" name="Productquantity" onChange={inputvalue}>
                  <option>Select Units</option>
                  <option value={"1"}>1</option>
                </select>
              </div>


              <div>
                <label className="block text-sm text-gray-500 mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" defaultChecked />
                    Active
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" />
                    Disabled
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-gray-700 font-semibold mt-4 mb-2">Product Price</h3>
                <label className="block text-sm text-gray-500 mb-1">Regular Price</label>
                <input type="text" onChange={inputvalue} placeholder="$0.00" name='Regularprice' className="w-full border px-3 py-2 rounded mb-3" />
                <label className="block text-sm text-gray-500 mb-1">Sale Price</label>
                <input type="text" onChange={inputvalue} name="Saleprice" placeholder="$0.00" className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <button  onClick={productbtn} className="bg-green-600 text-white  mt-5 px-59 py-2 rounded hover:bg-green-700 font-semibold">
                  Create Product
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoardAddProduct;
