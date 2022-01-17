import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authentication } from "../config/MyService";
import Header from "./Header";
import { useLocation } from "react-router";
import Footer from "./Footer";

export default function Checkout() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cnumber, setCnumber] = useState(0);
  const [cvv, setCVV] = useState(0);
  const [name, setName] = useState();

  const [cart, setCart] = useState([]);
  const { state } = useLocation();
  console.log(state);

  console.log(state.orderno);

  let items = [];
  let total = [0];
  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      authentication(localStorage.getItem("_token")).then((res) => {
        if (res.data.err) {
          alert(res.data.msg);
          // console.log(res.data.msg)
        }
      });
    } else {
      alert("Login is Required");
      navigate("/login");
    }
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);
    console.log(cartItems);
  }, []);

  const checkout = () => {
    // localStorage.removeItem("mycart");
    // navigate('/address')
    navigate("/address", {
      state: { orderno: state.orderno },
    });
  };

  return (
    <>
      <Header />
      <div className="container-fuild" style={{backgroundColor:"salmon"}}>
          <br/>
          <div className="card1">
            <h4 style={{marginLeft:"0px"}}>Review Bill</h4>
            <hr />
            <table className="text-center" style={{marginLeft:"650px"}}>
              <tr className="text-success">
                <th>
                  <h3>Grand Total: </h3>
                </th>
                <th>
                  <h1> ₹ {localStorage.getItem("total")}</h1>
                </th>
              </tr>
              <br />
            </table>
            <br />
            <div className="cardD" style={{marginLeft:"500px",marginRight:"500px"}}>
              <h5>Dedit Card Details</h5>
              <br />
              {/* <input type="text" placeholder="Enter Name on Card " className='form-control' name="name" onChange={(e) => { setName(e.target.value) }} />
                        {name != '' && name.length < 5 && <span className="text-danger">Enter Name correctly</span>}<br /> */}
              <input
                type="number"
                placeholder="Enter Credit Card "
                className="form-control"
                name="cnumber"
                onChange={(e) => {
                  setCnumber(e.target.value);
                }}
              />
              {cnumber != "" && cnumber.length < 16 && (
                <span className="text-danger">
                  Enter Credit Card number correctly
                </span>
              )}
              <br />
              <input
                type="number"
                placeholder="Enter CVV "
                className="form-control"
                name="cvv"
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
              {cvv != "" && cvv.length < 3 && (
                <span className="text-danger">Enter CVV number correctly</span>
              )}
              <br />
              <button className="btn btn-dark" onClick={() => checkout()}>
                Check out
              </button>
            </div>
            &nbsp;
          </div>
       
      </div>
      <Footer/>
    </>
  );
}
