import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Form,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { TiDeleteOutline } from "react-icons/ti";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import axios from "axios";
import Header from "./Header";
import { createOrders } from "../config/MyService";
import Footer from "./Footer";

export default function Cart() {
  let items = [];
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  let total = [0];
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);
  }, []);
  console.log(cart);

  const onAdd = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist.quantity === 1) {
      // setCart(cart.filter((item) => item._id !== product._id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    }
  };
  const onDelete = (index) => {
    let lstore = JSON.parse(localStorage.getItem("mycart"));
    lstore.splice(index, 1);
    console.log(lstore);
    let setStore = JSON.stringify(lstore);
    localStorage.setItem("mycart", setStore);
    setCart(lstore);
    window.location.reload(false)
  };

  const checkout = () => {
    console.log(cart);

    cart.map((value) => {
      let allorders = {
        product_name: `${value.name}`,
        product_cost: `${value.price}`,
        product_image: `${value.image}`,
        quantity: `${value.quantity} `,
      };
      items.push(allorders);
    });
    let email = localStorage.getItem("user");
    let orderno = Math.random().toFixed(6).split(".")[1];
    let tot = total.reduce((result, number) => result + number);
    localStorage.setItem("total", tot);
    let checkout = {
      email: email,
      items: items,
      orderno: orderno,
      total: total.reduce((result, number) => result + number),
    };
    console.log(checkout);

    createOrders(checkout).then((res) => {
      console.log(res.data);

      navigate("/checkout", {
        state: { orderno: orderno },
      });
    });
  };

  const addtoCart = (obj) => {
    console.log(obj.name);
    let item = {
      name: obj.product_name,
      price: obj.product_cost,
      _id: obj._id,
      quantity: 1,
      image: obj.product_image,
      des: obj.product_desc,
    };
    if (localStorage.getItem("mycart") !== null) {
      let arr = JSON.parse(localStorage.getItem("mycart"));
      let idArrays = [];
      arr.forEach((data) => {
        idArrays.push(data._id);
      });

      if (idArrays.includes(obj._id)) {
        alert("Product Already Added");
      } else {
        arr.push(item);
        localStorage.setItem("mycart", JSON.stringify(arr));
        alert("Product Added to Cart");
            }
    } else {
      let arr = [];
      arr.push(item);
      localStorage.setItem("mycart", JSON.stringify(arr));
      alert("Product Added to Cart");
      window.location.reload(false)

    }
  };
  return (
    <>
    <div>
      <Header />
     
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-8">
            <div className="cart">
              <table className="table" style={{ border: "3px solid black",backgroundColor:"salmon"}}>
                <thead>
                  <tr style={{ border: "3px solid black" }}>
                    <th>Sr.No</th>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ fontWeight: "620" }}>
                  {cart
                    ? cart.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div>
                                <img

                                style={{border:"2px solid black"}}
                                  src={value.image}
                                  height="210px"
                                  width="220px"
                                />
                              </div>
                              {value.name}
                            </td>

                            <td>{value.price}</td>
                            <td>
                              <div className="row">
                                <div className="col">
                                  <GrFormSubtract
                                    size="20px"
                                    onClick={() => onRemove(value)}
                                  >
                                    {" "}
                                    SUBSTRACT
                                  </GrFormSubtract>
                                </div>
                                <div className="col">
                                  <input
                                    className="text-center"
                                    type="text"
                                    style={{
                                      border: "2px solid black",
                                      width: "100px",
                                    }}
                                    value={value.quantity}
                                  />
                                </div>
                                <div className="col">
                                  <GrFormAdd
                                    size="20px"
                                    onClick={() => onAdd(value)}
                                  >
                                    {" "}
                                    ADD
                                  </GrFormAdd>
                                </div>
                              </div>
                            </td>
                            <td>{value.quantity * value.price}</td>
                            <td>
                              <TiDeleteOutline
                                size="25px"
                                onClick={() => onDelete(index)}
                              />
                            </td>
                            {console.log(
                              total.push(value.price * value.quantity)
                            )}
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="col-md-4"
            style={{
              border: "3px solid black",
              height: "300px",
              width: "438px",
              borderRadius:"30px",
              backgroundColor:"thistle"

            }}
          >
            <div>
              <br />
              <h3>Summary</h3>
              <hr style={{ fontWeight: "600" }} />
              <div className="row">
                <div className="col-md-6">
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    Subtotal :{" "}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    GST(5%):{" "}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "red",
                      fontSize: "17px",
                    }}
                  >
                    Grand Total :{" "}
                  </p>
                </div>
                <div className="col-md-6">
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    ₹ {total.reduce((result, number) => result + number)}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    ₹ {0.05 * total.reduce((result, number) => result + number)}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "red",
                      fontSize: "17px",
                    }}
                  >
                    ₹
                    {total.reduce((result, number) => result + number) +
                      0.05 * total.reduce((result, number) => result + number)}
                  </p>
                </div>
              </div>

              <br />
              <button className="btn btn-primary" onClick={() => checkout()}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>

        <br />
      </div>
    </div>
    <Footer/>
    </>
  );
}
