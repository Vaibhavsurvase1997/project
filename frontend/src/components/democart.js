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
import { AiOutlineDelete } from "react-icons/ai";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
// import HomeNavbar from "./HomeNavbar";
import axios from "axios";
import Header from "./Header";
import {createOrders} from '../config/MyService'

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
  };

  const checkout = () => {
    console.log(cart);

    cart.map((value) => {
      let allorders = { product_name: `${value.name}`, product_cost: `${value.price}`, product_image: `${value.image}`, quantity: `${value.quantity} ` }
      items.push(allorders)
    });
    let email = localStorage.getItem('user')
    let orderno = Math.random().toFixed(6).split('.')[1];
    let tot = total.reduce((result, number) => result + number);
    localStorage.setItem('total', tot)
    let checkout = {
      email: email,
      items: items,
      orderno:orderno,
      total: total.reduce((result, number) => result + number),
    };
    console.log(checkout);

    createOrders(checkout)
      .then((res) => {
        console.log(res.data)
        
        navigate("/checkout", {
          state: { orderno:orderno },
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
            window.location.reload();
        }
    } else {
        let arr = [];
        arr.push(item);
        localStorage.setItem("mycart", JSON.stringify(arr));
        alert("Product Added to Cart");
    }
};
  return (
    <div>
      <Header />
      <div class="card">
    <div class="row">
        <div class="col-md-8 cart">
            <div class="title">
                <div class="row">
                    <div class="col">
                        <h4><b>Shopping Cart</b></h4>
                    </div>
                    <div class="col align-self-center text-right text-muted">3 items</div>
                </div>
            </div>
            <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"/></div>
                    <div class="col">
                        <div class="row text-muted">Shirt</div>
                        <div class="row">Cotton T-shirt</div>
                    </div>
                    <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                </div>
            </div>
            <div class="row">
                <div class="row main align-items-center">
                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg"/></div>
                    <div class="col">
                        <div class="row text-muted">Shirt</div>
                        <div class="row">Cotton T-shirt</div>
                    </div>
                    <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                </div>
            </div>
            <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg"/></div>
                    <div class="col">
                        <div class="row text-muted">Shirt</div>
                        <div class="row">Cotton T-shirt</div>
                    </div>
                    <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                </div>
            </div>
            <div class="back-to-shop"><a href="#">&leftarrow;</a><span class="text-muted">Back to shop</span></div>
        </div>
        <div class="col-md-4 summary">
            <div>
                <h5><b>Summary</b></h5>
            </div>
            <hr/>
            <div class="row">
                <div class="col" style="padding-left:0;">ITEMS 3</div>
                <div class="col text-right">&euro; 132.00</div>
            </div>
            <form>
                <p>SHIPPING</p> <select>
                    <option class="text-muted">Standard-Delivery- &euro;5.00</option>
                </select>
                <p>GIVE CODE</p> <input id="code" placeholder="Enter your code"/>
            </form>
            <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                <div class="col">TOTAL PRICE</div>
                <div class="col text-right">&euro; 137.00</div>
            </div> <button class="btn">CHECKOUT</button>
        </div>
    </div>
</div>
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-9">
            <div className="cart">
              <div className="table">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart
                    ? cart.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={value.image}
                                height="120px"
                                width="120px"
                              />{" "}<br/><br/>
                              {value.name}
                            </td>

                            <td>{value.price}</td>
                            <td>
                              <Row>
                                <Col>
                                  <GrSubtractCircle size="20px"
                                    onClick={() => onRemove(value)}
                                  />
                                </Col>
                                <Col>
                                  <FormControl
                                    type="text"
                                    disabled
                                    min="1"
                                    max="20"
                                    value={value.quantity}
                                  />
                                </Col>
                                <Col>
                                  <GrAddCircle size="20px" onClick={() => onAdd(value)}/>
                                </Col>
                              </Row>
                            </td>
                            <td>{value.quantity * value.price}</td>
                            <td>
                              <AiOutlineDelete
                                color="red"
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
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="cart">
              <h3>Review Order</h3>
              <hr />
              <table bordered width="200px">
                <tr>
                  <td>Subtotal:</td>
                  <td>₹ {total.reduce((result, number) => result + number)}</td>
                </tr>
                <tr>
                  <td>GST(5%):</td>
                  <td>
                    ₹ {0.05 * total.reduce((result, number) => result + number)}
                  </td>
                </tr>
              </table>
              <table className="card1" width="200px">
                <tr>
                  <th>Grand Total:</th>
                  <th>
                    ₹
                    {total.reduce((result, number) => result + number) +
                      0.05 * total.reduce((result, number) => result + number)}
                  </th>
                </tr>
              </table>
              <br />
              <button className="btn btn-primary" onClick={() => checkout()}>Proceed to Buy</button>
            </div>
          </div>
        </div>

        <br />

        {/* <Container style={{ backgroundColor: "lightgray", padding: "10px" }}>
        <Form.Label>Credit Card Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter credit card details"
          id="card"
        />
        <br />
        <Button variant="dark" onClick={() => checkout()}>
                    Checkout
                </Button>
      </Container> */}
      </div>
    </div>
  );
}
