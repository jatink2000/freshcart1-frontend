import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const ShopCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.Saleprice * item.Productquantity,
    0
  );

  useEffect(() => {
    cartdata();
  }, []);

  let cartdata = () => {
    axios.get("https://freshcart-backend-9t2w.vercel.app/allcartitem").then((res) => {
        if (res.data.status) {
          setCartItems(res.data.ourcartitem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // checkout page url ---------------
   let go= useNavigate()
    let checkout=()=>{
        go("/CheckOutPage",{state:cartItems})
    }




  let CARTITEM = ({ data }) => {
    // console.log(data)

    //  removecartitem-------------------

    let removecartitem = (item) => {
      //    console.log(itemid)
      axios
        .post("https://freshcart-backend-9t2w.vercel.app/removecartitem", item)
        .then((res) => {
          if (res.data.status) {
            alert("remove item");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // updatequantity--------------
    let [quantity, setquantity] = useState(data.Productquantity);

    let increasequantity = () => {
      setquantity(++quantity);

      axios.post("https://freshcart-backend-9t2w.vercel.app/updatequantity", { quantity, data });

      window.location.reload();
    };

    let decreasequantity = () => {
      setquantity(--quantity);

      axios.post("https://freshcart-backend-9t2w.vercel.app/updatequantity", { quantity, data });
      window.location.reload();
    };

    // Productdetails----------------

    let go = useNavigate();

    let Productdetails = (product) => {
      //  console.log(product)
      go("/Productdetails", { state: product });
    };

    return (
      <>
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <img
              onClick={() => Productdetails(data)}
              src={data.Productimage}
              alt={data.Producttitle}
              className="w-14 h-14 object-contain"
            />
            <div>
              <h4 className="font-semibold">{data.Producttitle}</h4>
              <p className="text-sm text-gray-500">
                {data.Productweight || "250g"}
              </p>
              <button
                className="flex items-center text-red-600 text-sm mt-1 hover:underline"
                onClick={() => removecartitem(data)}
                // onClick={() => handleRemove(item._id)}
              >
                <FaTrashAlt className="mr-1 text-sm" /> Remove
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex border rounded overflow-hidden">
              <button
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                // onClick={() => handleQuantity(item._id, -1)}
                onClick={decreasequantity}
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                // onClick={() => handleQuantity(item._id, 1)}
                onClick={increasequantity}
              >
                +
              </button>
            </div>
            <div className="font-bold text-gray-800">
              ₹{(data.Saleprice * data.Productquantity).toFixed(2)}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-1">🛒 Your Cart</h2>
        <p className="text-sm text-gray-500 mb-4">Location: 382480</p>

        {cartItems.length === 0 ? (
          <div className="text-gray-600 text-center mt-12">
            <p className="text-lg">Your cart is currently empty.</p>
            <p className="text-sm mt-1">
              Start adding products to see them here.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">
              🎉 You’ve got FREE delivery. Start{" "}
              <span className="font-bold">checkout now!</span>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <>
                  <CARTITEM  data={item} />
                </>
              ))}
            </div>

            {/* Total Summary */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => (window.location.href = "/home")}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
              >
                Continue Shopping
              </button>
              <button
                // onClick={() => window.location.href = "/CheckOutPage"}
                onClick={() =>checkout() }
                className="bg-gray-900 text-white px-5 py-2 rounded hover:bg-gray-800"
              >
                Proceed To Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopCart;






// import React, { useEffect, useState } from "react";
// import productimg13 from "../assets/productimg13.jpg"
// import { FaTrashAlt } from "react-icons/fa"
// import productimg17 from "../assets/productimg17.jpg"
// import productimg18 from "../assets/productimg18.jpg"
// import productimg19 from "../assets/productimg19.jpg"
// import axios from "axios";
// import Swal from "sweetalert2";

// function Addtocart() {

//   let [addtocart, setaddtocart] = useState([])

//   useEffect(() => {
//     addtocartitem()
//   }), []

//   let addtocartitem = () => {
//     axios.get("https://freshcart-backend-9t2w.vercel.app/addtocartproduct").then((res) => {
//       if (res.data.status) {
//         setaddtocart(res.data.addtocartproduct)
//       }
//     }).catch((err) => {
//       console.log(err)
//     })
//   }

//deleteproduct--------------

// let deleteproduct = (item) => {

// Swal.fire({
// title: "Are you sure ?",
// showDenyButton: true,
// showCancelButton: true,
// confirmButtonText: "Delete",
// denyButtonText: `Don't save`,
//     }).then((result) => {
//       if (result.isConfirmed) {

//         axios.post("https://freshcart-backend-9t2w.vercel.app/deleteaddtocartproduct", item).then((res) => {
//         if (res.data.status) {
//           Swal.fire({
//             title: "Delete Product !",
//             icon: "success",
//           });

//           setTimeout(function groot(){
//           window.location.reload()
//           }, 3000)

//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     }
//     });
//   };

//   return (
//     <div className="p-8">
//       <div className="text-sm breadcrumbs text-green-600">
//         <ul className="flex gap-2">
//           <li><a href="#">Home</a></li>
//           <li><a href="#">Shop</a></li>
//           <li className="text-gray-600">Shop Addtocart</li>
//         </ul>
//       </div>

//       <h1 className="text-3xl font-bold mt-4">My Add to cart</h1>
//       <p className="text-gray-600 mb-6">There are {addtocart.length} products in this wishlist.</p>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4"><input type="checkbox" /></th>
//               <th className="p-4">Product</th>
//               <th className="p-4">Product Category</th>

//               <th className="p-4">Amount</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Action</th>
//               <th className="p-4">Remove</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addtocart.map((item) => (
//               <tr key={item.id} className="border-t">
//                 <td className="p-4">
//                   <input type="checkbox" />
//                 </td>
//                 <td className="p-4 flex items-center gap-4">
//                   <img src={item.Productimage} alt={item.Producttitle} className="w-12 h-12 object-contain" />
//                   <div>
//                     <div className="font-semibold">{item.Producttitle}</div>
//                     <div className="text-sm text-gray-500">{item.Productweight}</div>
//                   </div>
//                 </td>
//                 <td className="p-4 text-gray-700">{item.Productcategory}</td>
//                 <td className="p-4 text-gray-700">{item.Saleprice}</td>
//                 <td className="p-4">
//                   <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">In Stock</span>
//                 </td>
//                 <td className="p-4 text-gray-700">
//                   <button className="bg-green-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-green-700">
//                     Add to cart
//                   </button>
//                 </td>
//                 <td className="p-4 text-center">
//                   <button className="text-gray-500 hover:text-red-500" onClick={() => deleteproduct(item)}>
//                     <FaTrashAlt />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Addtocart;
