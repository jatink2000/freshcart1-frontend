import { FaShoppingBag, FaSyncAlt, FaHeart } from "react-icons/fa";
// import productimg1 from "../assets/productimg1.jpg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ProductDetail() {
  //  const loc = useLocation();

  //   // ✅ Always define hooks at top — with default values
  //   const [image, setImage] = useState('');
  //   const [data, setData] = useState([]);

  //   // ✅ When loc.state is available, set image from it
  //   useEffect(() => {
  //     if (loc.state?.Productimage) {
  //       setImage(loc.state.Productimage);
  //     }
  //   }, [loc.state]);

  //   // ✅ Fetch products only once
  //   useEffect(() => {
  //     apidata();
  //   }, []);

  //   const apidata = () => {
  //     axios.get('https://freshcart1-backend.vercel.app/products')
  //       .then((res) => {
  //         if (res.data.status) {
  //           setData(res.data.ourproduct);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   // ✅ If no data from location, show loading
  //   if (!loc.state) {
  //     return <div>Loading...</div>;
  //   }

  //   // ✅ Change image handler
  //   const changeImage = (item) => {
  //     setImage(item);
  //   };

  let loc = useLocation();
  // console.log(loc.state)

  let a = loc.state;

  // console.log(a._id)

  let id = a._id;

  if (!a) {
    return <div>Loading...</div>;
  }

  // changeimage -----------
  let [image, setimage] = useState(loc.state.Productimage);

  let changeimage = (item) => {
    // console.log(item)
    setimage(item);
  };





  // let [data, setdata] = useState([]);
  // let go= useNavigate()

  // useEffect(() => {
  //   apidata();
  // });

  // let apidata = () => {
  //   axios.get("https://freshcart1-backend.vercel.app/products").then((res) => {
  //       if (res.data.status) {
  //         setdata(res.data.ourproduct);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
 



  
  // review ----------------

  let [review, setreview] = useState([]);
  console.log(review);

  let inputvalue = (e) => {
    setreview({ ...review, [e.target.name]: e.target.value });
  };

  let reviewbtn = () => {
    axios
      .post("https://freshcart1-backend.vercel.app/productreview", { review, id })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "review submit !",
            icon: "success",
          });

          setTimeout(()=>{
              window.location.reload()
          },2000)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  





  // wishlist---------------

  let wishlist = (a) => {
    axios.post("https://freshcart1-backend.vercel.app/wishlist", { a }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "wishlist Success !",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // addtocart---------------


   let cartbtn=(cartitem)=>{
    axios.post("https://freshcart1-backend.vercel.app/cart",{cartitem}).then((res) => {
      if (res.data.status) {
         Swal.fire({
            title: "addtocart Success !",
            icon: "success",
          });
        // alert("add to cart")
      }
    }).catch((err) => { 
      console.log(err)
    })
  }




  // let addtocart = (a) => {
  //   axios.post("https://freshcart1-backend.vercel.app/addtocart", { a }).then((res) => {
  //       if (res.data.status) {
  //         Swal.fire({
  //           title: "addtocart Success !",
  //           icon: "success",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  // review list----------------------

  let [reviews, setreviews] = useState([]);
  // console.log(reviews)

  useEffect(() => {
    reviewapidata();
  }, []);

  let reviewapidata = () => {
    axios
      .get("https://freshcart1-backend.vercel.app/allreview")
      .then((res) => {
        if (res.data.status) {
          setreviews(res.data.ourreview);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };




  
 // filterreview------------------

  let filterreview = reviews.filter(data=> data.productid==id)
  // console.log(filterreview)




// allproduct api


  let [Products,setProducts]= useState([])

  useEffect(()=>{
       apidata()
  },[])

  let apidata=()=>{
    axios.get("https://freshcart1-backend.vercel.app/products").then((res) => {
          if (res.data.status) {
             setProducts(res.data.dataproduct)
          }
        }).catch((err) => {
          console.log(err)
        })
  }


// console.log(Products)




  // related products----------------

  
  let filtereddata=Products.filter(data=> data.Productcategory==a.Productcategory)
  // console.log(filtereddata)

  let selectedproduct=filtereddata.slice(0,5)
  // console.log(selectedproduct)



    let go= useNavigate()


    let Productdetails=(product)=>{
  //  console.log(product)
  go("/Productdetails",{state:product})

  window.location.reload()
}





  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl p-6 flex justify-center">
            <img
              src={image}
              alt="Product"
              onClick={() => changeImage(a.Productimage)}
              className="w-full max-w-sm object-contain rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
              <span className="text-green-600 font-medium">Home</span> /{" "}
              <span className="text-green-600 font-medium">Shop</span> /{" "}
              Haldiram's Sev Bhujia
            </div>

            {/* Category */}
            <p className="text-green-600 font-semibold">{a.Productcategory}</p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {a.Producttitle}
            </h1>

            {/* Ratings */}
            <div className="text-green-600 text-sm">
              ⭐⭐⭐⭐⭐ <span className="text-gray-600">(4 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">
              ₹21.6{" "}
              <span className="line-through text-gray-400 ml-2 font-normal text-lg">
                ₹24
              </span>{" "}
              <span className="text-red-500 text-base font-medium ml-2">
                10% Off
              </span>
            </div>

            {/* Weight Options */}
            <div className="flex gap-2 flex-wrap">
              {["250g", "500g", "1kg"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 rounded-md hover:bg-gray-100 text-sm"
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-100 text-lg rounded-l">
                -
              </button>
              <span className="px-6 py-2 border-t border-b">1</span>
              <button className="px-4 py-2 bg-gray-100 text-lg rounded-r">
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded flex items-center gap-2 hover:bg-green-700"
                onClick={() => cartbtn(a)}
              >
                <FaShoppingBag />
                Add to cart
              </button>

              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Buy Now
              </button>

              <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded hover:bg-gray-200">
                <FaSyncAlt />
              </button>

              <button
                className="bg-gray-100 text-gray-700 px-4 py-3 rounded hover:bg-gray-200"
                onClick={() => wishlist(a)}
              >
                <FaHeart />
              </button>
            </div>

            {/* Meta Info */}
            <div className="text-sm text-gray-600 space-y-1 pt-2">
              <p>
                <span className="font-semibold text-gray-800">
                  Product Code:
                </span>{" "}
                FBB00255
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Availability:
                </span>{" "}
                <span className="text-green-600 font-medium">In Stock</span>
              </p>
            </div>
          </div>
        </div>
      </div>



           {/* review-------------------------- */}


      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-start">




          {/* Review list */}
          <div className="w-full md:w-1/2">
            <div className="p-4 max-w-xl mx-auto">
              <h1 className="font-extrabold text-2xl mb-1">Reviews</h1>
              <p className="text-gray-600 mb-4">
                {filterreview.length} Review{filterreview.length > 1 ? "s" : ""}
              </p>

              {filterreview.map((item) => (
                <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
                  {/* Avatar + Name */}
                  <div className="flex items-center mb-2">
                    <div
                      className="w-10 h-10 rounded-full mr-3 text-white uppercase flex items-center justify-center"
                      style={{ backgroundColor: "#28a745" }}>
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                    </div>
                  </div>

                  {/* Review message */}
                  <p className="text-gray-700 italic">"{item.review}"</p>
                </div>
              ))}
            </div>
          </div>




          {/* Review form */}
          <div className="w-full md:w-1/2 space-y-6">
            <div style={{ padding: "1rem", fontFamily: "Arial" }}>
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  maxWidth: "400px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3 className="font-bold mb-4">Write A Review</h3>
                <label>Your Name</label>
                <input
                  onChange={inputvalue}
                  type="text"
                  placeholder="Your Name"
                  name="fullname"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.75rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />

                <label>Your Review</label>
                <textarea
                  placeholder="Your Review"
                  rows="4"
                  onChange={inputvalue}
                  name="review"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.75rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <button
                  onClick={reviewbtn}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 25px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



     

     {/* Related products--------------------- */}


        <div className='px-4'>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      </div>
       
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">

      {selectedproduct.map((item) => (
        <div key={item._id} className="border rounded-lg p-3 shadow hover:shadow-lg transition relative " 
            onClick={()=>Productdetails(item)} >
          
          {/* Tag and Discount */}
          {(item.tag || item.discount) && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {item.tag && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">{item.tag}</span>
              )}
              {item.discount && (
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">{item.discount}</span>
              )}
            </div>
          )}

          {/* Image */}
          <img
            src={item.Productimage}
            alt={item.Producttitle}
            onClick={()=>Productdetails(item)}
            className="w-full h-32 object-contain mx-auto"
          />

          {/* Category */}
          <p className="text-sm text-gray-500 mt-2">{item.Productcategory}</p>

          {/* Title */}
          <h2 className="text-base font-semibold text-gray-800">{item.Producttitle}</h2>

          {/* Ratings */}
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            ⭐ {item.rating} <span className="text-gray-500 ml-1">({item.reviews})</span>
          </div>

          {/* Price */}
          <div className="mt-1">
            <span className="font-semibold text-gray-900">${item.Saleprice}</span>
            {item.originalPrice > item.price && (
              <span className="text-gray-400 line-through ml-2 text-sm">${item.price}</span>
            )}
          </div>

          {/* Add Button */}
          <button className="mt-3 w-half bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700 transition">
            + Add
          </button>
        </div>
      ))}
    </div>
          




      <Footer />
    </>
  );
}

export default ProductDetail;
