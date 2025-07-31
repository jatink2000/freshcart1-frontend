import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import ForgetPassword from './Pages/ForgetPassword';
import Home from './Pages/Home';
import DashBoard from './Pages/DashBoard';
import DashBoardProduct from './Pages/DashBoardProduct'
import DashBoardAddProduct from './Pages/DashBoardAddproduct';
import ProductDetail from './Components/ProductDetails';
import Editproduct from './Components/Editproduct';
import AddtocartPage from './Pages/Addtocartpage';
import CheckoutComp from './Components/CheckoutComp';
import Addnewaddress from './Components/Addnewaddress';
import DashBoardOrder from './Pages/DashBoardOrder';
import DashboardReview from './Pages/DashBoardReview';
import DashboardCustomer from './Pages/DashBoardCustomer';
import WishListPage from './Pages/WishListPage';
// import CheckOutPage from './pages/CheckOutPage'



const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/wishlistpage" element={<WishListPage/>} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path='/CheckOutPage' element={<CheckoutComp/>} />
        <Route path='/Addnewaddress' element={<Addnewaddress/>} />
        <Route path='/DashBoard/DashBoardProduct' element={<DashBoardProduct/>} /> 
        <Route path='/DashBoard/DashBoardOrder' element={<DashBoardOrder/>} /> 
        <Route path='/DashBoard/DashboardReview' element={<DashboardReview/>} /> 
        <Route path='/DashBoard/DashboardCustomer' element={<DashboardCustomer/>} /> 
          <Route path='/productdetails' element={<ProductDetail/>}/>
        <Route path='/DashBoard/Addproduct' element={<DashBoardAddProduct/>} /> 
        <Route path='/Editproduct' element={<Editproduct/>} /> 
        <Route path='/addtocartpage' element={<AddtocartPage/>} /> 



      </Routes>
    </Router>
  );
};

export default App;
