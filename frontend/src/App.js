import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Forgotpassword from "./components/Forgotpassword";
import Otp from "./components/Otp";
import Product from "./components/Product";
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Cart from './components/Cart'
import Thankyou from "./components/Thankyou";
import Maps from "./components/Maps";

import Order from "./Myprofile/Order";
import Profile from "./Myprofile/Profile";
import Myaccount from "./Myprofile/MyAccount";
import ChangePassword from "./Myprofile/ChangePassword";
import Address from "./Myprofile/Address";
import Checkout from "./components/Checkout";
import Invoice from "./components/Invoice";







function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp/>}/>
        <Route path="/forgot" element={<Forgotpassword/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/thankyou" element={<Thankyou/>}/>
        <Route path="/map" element={<Maps/>}/>

        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myaccount" element={<Myaccount/>}/>
        <Route path="/changepassword" element={<ChangePassword/>}/>
        <Route path="/address" element={<Address/>}/>

        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/invoice" element={<Invoice/>}/>

</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
