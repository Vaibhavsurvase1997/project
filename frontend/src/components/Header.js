import React from "react";
import {
  Container,
  Navbar,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Nav,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetails from './ProductDetails'
import { useNavigate } from "react-router-dom";
import "./Style.css";

export default function Header(props) {
  const [len, setLen] = useState(0)
  const navigate = useNavigate();
  const [flag, setFlag]=useState(1);
  const [flag2, setFlag2]=useState(1);
  const [flag3,setFlag3]=useState(1);


  const logout = (e) => {
    localStorage.clear();
    // localStorage.removeItem("user");
    setFlag(0)

    navigate("/")

  }

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));

    if (cartItems) {
      setLen(cartItems.length);

      console.log(cartItems.length);
    }
  }, []);

  return (
    <div>    
      <Navbar className="navi" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" style={{ color: "white" }}>
            Neo
            <span style={{ color: "red" }}>STORE</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "70px" }}
              navbarScroll
            >
              {/* <Nav.Link href="/" className="text-white">
                Home
              </Nav.Link> */}
              <li class="nav-item">
              <a class="nav-link" href="/">
                Home
              </a>
            </li><li class="nav-item">
              <a class="nav-link" href="/product">
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/order">
                Orders
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Address
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/myaccount">
                My Account
              </a>
            </li>
              {/* <Nav.Link href="/product" className="text-white">
                Products
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                Orders
              </Nav.Link> */}
            </Nav>
            <form className="d-flex">
              <input
                type="search"
                placeholder="Search"
                className="searchfield"
                aria-label="Search"
              />&nbsp;&nbsp;&nbsp;
              <button  className="searchbutton" >
                Search
              </button>&nbsp;&nbsp;&nbsp;
              <button  className="cartbutton" href="/cart">
                <AiOutlineShoppingCart size="20px"  />{len}
              </button>&nbsp;&nbsp;&nbsp;
              <NavDropdown id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item >View Profile</NavDropdown.Item>
                {localStorage.getItem('user')?

                <NavDropdown.Item href="/myaccount">My Account</NavDropdown.Item>
                : " "}
                <NavDropdown.Item href="/cart">cart</NavDropdown.Item>

                

                {localStorage.getItem('user')?
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                : " "}

              </NavDropdown>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
