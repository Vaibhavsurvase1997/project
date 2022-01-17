import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { getsingleproduct } from "../config/MyService";
import { useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import Header from "./Header";
import Zoom from "react-img-zoom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Style.css";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import ReactStars from "react-rating-stars-component";
import { Row, Col, Button } from "react-bootstrap";

function ProductDetails(props) {
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  const [mainimage, setmainimage] = useState();
  const [rating, setrating] = useState();
  const [uid, setUid] = useState("");
  const { state } = useLocation();

  const ratingChanged = (rating) => {
    console.log(rating);
  };
  useEffect(() => {
    console.log(state.id);
    getsingleproduct(state.id).then((res) => {
      console.log(res.data);
      setrating(res.data.product.product_rating);
      setPostdata(res.data.product);
      setmainimage(res.data.product.product_image);
      setimages(res.data.image);
    });
  }, []);
  console.log(postdata);
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
        window.location.reload(false);
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
      <div>
        <br />
        <br />
        <br />
        <div className="container">
          <div className=" row">
            <div className=" col-md-6">
              {/* <div className="fluid">
                <div className="fluid__image-container"> */}
              {/* <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "No image",
                    isFluidWidth: true,
                    src: mainimage,
                  },
                  largeImage: {
                    src: mainimage,
                    width: 1200,
                    height: 1800,
                  },
                }}
              /> */}
              {/* <Zoom img={mainimage} zoomScale={3} width={600} height={600} /> */}

              <TransformWrapper
              // initialScale={1}
              // initialPositionX={0}
              // initialPositionY={0}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                   
                    <br />
                    <TransformComponent>
                      <img
                        src={mainimage}
                        alt="test"
                        height="550px"
                        width="550px"
                      />
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  className="card1"
                />
              </div>
              <h1 className="">{postdata.product_name}</h1>
              <br />
              <h5>
                {" "}
                Price{" "}
                <span className="text-danger"> ₹ {postdata.product_cost}</span>
                <p>(Inclusive of all taxes)</p>
              </h5>
              <br />
              <h5>About this item:</h5>
              <p>{postdata.product_desc}</p>
              <br />
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <button className="add" onClick={() => addtoCart(postdata)} >Add to cart</button>
                </div>
                <br />
                <br />
                <div className="col-md-6">
                  {" "}
                  <a className="btn btn-secondary text-uppercase">
                    Rate product
                  </a>
                </div>
              </div>
              <br />
              <br />
              <br />
              <h4>Share</h4>

              <div className="col-md-12">
                <FacebookShareButton
                  url="https://www.amazon.in/"
                  title={"Checkout " + postdata.product_name}
                  hashtag="#react"
                >
                  <FacebookIcon
                    logofillColor="white"
                    round={true}
                  ></FacebookIcon>
                </FacebookShareButton>
                &nbsp; &nbsp;
                <WhatsappShareButton
                  url="https://www.amazon.in/"
                  title={"Checkout " + postdata.product_name}
                  hashtag="#react"
                >
                  <WhatsappIcon
                    logofillColor="white"
                    round={true}
                  ></WhatsappIcon>
                </WhatsappShareButton>
                &nbsp; &nbsp;
                <TwitterShareButton
                  url="https://www.amazon.in/"
                  title={"Checkout " + postdata.product_name}
                  hashtag="#react"
                >
                  <TwitterIcon logofillColor="white" round={true}></TwitterIcon>
                </TwitterShareButton>
              </div>
              {/* </div>
              </div> */}
            </div>
            <br />
            <br />
          </div>
          <div className="col-md-3">
            {images.map((item) => (
              <button
                className="btn"
                width="100px"
                height="400px"
                onClick={() => setmainimage(item)}
              >
                <img
                  src={item}
                  width="100px"
                  height="30px"
                  className="img-fluid "
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default ProductDetails;
