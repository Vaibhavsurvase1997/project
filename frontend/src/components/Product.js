import React, { useEffect, useState } from "react";
// import categorySchema from "./categorySchema";
import { getcategory, getPosts } from "../config/MyService";
import Footer from "./Footer";
import Header from "./Header";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { StarsRating } from "stars-rating-react-hooks";
import {BiLike,BiDislike,BiCategoryAlt,BiColorFill} from 'react-icons/bi'
import {MdOutlineCategory,MdOutlineColorLens} from 'react-icons/md'


function Product(props) {
  const [postdata, setPostdata] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postdata.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [selecting, setSelecting] = useState(null);


  const singleitem = (id) => {
    console.log(id);
    navigate("/productdetails", {
      state: { id: id },
    });
  };
  const config = {
    totalStars: 5,
    initialSelectedValue: 4.5,
    renderFull: (
      <img src="https://media.istockphoto.com/vectors/yellow-star-icon-logo-vector-id1137310097?k=20&m=1137310097&s=170667a&w=0&h=tD2RgD0Gpk-4AOAPKZ_dz2E7eQMk0dUgoDFMaTGP-kk=" height="25px"/>
    ),
    renderEmpty: (
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1200px-Five-pointed_star.svg.png" height="20px" />
    ),
    // renderHalf: (
    //   <img src="https://img.icons8.com/ios-filled/50/000000/star-half-empty.png" height="20px" />
    // )
  };

  useEffect(() => {
    getPosts().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      console.log(res.data.product);
    });
  }, []);
  console.log(postdata);

  const filterCategory = (catItem) => {
    console.log(temp);
    const result = temp.filter((curdata) => {

      return curdata.category_id.category_name === catItem;
    });

    setPostdata(result);
  };

  const filterColor = (catItem) => {
    const result = postdata.filter((curdata) => {
      return curdata.color_id.color_name === catItem;
    });
    setPostdata(result);

  };
  const allproduct = () => {
    getPosts().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      setTemp(res.data.product);
    });
  };
  useEffect(() => {
    allproduct();
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
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 mt-5">
            <br />
            <br />

            <h5>Filter by Category</h5>

            <br/>
            <div className="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                
              >
               
                Category
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() => filterCategory("Sofa")}>
                  Sofa
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => filterCategory("Chair")}
                >
                  Chair
                </a>
                <a class="dropdown-item" onClick={() => filterCategory("Bed")}>
                  Bed
                </a>
                <a class="dropdown-item" onClick={() => filterCategory("Cupboard")}>
                  Cupboard
                </a>
              </div>
            </div>

            <br />
            <div className="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><MdOutlineColorLens size={"20px"}/>&nbsp;
                Color
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
               
                <a class="dropdown-item" onClick={() => filterColor("yellow")}>
                  Yellow
                </a>
                <a class="dropdown-item" onClick={() => filterColor("blue")}>
                  Blue
                </a>
                <a class="dropdown-item" onClick={() => filterColor("red")}>
                  Red
                </a>
                <a class="dropdown-item" onClick={() => filterColor("white")}>
                  White
                </a>
              </div>
            </div>
          </div>
          <br />
          <div className="col-md-10">
            <input
              className="productsearch"
              type="text"
              class="form-control"
              placeholder="Search..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <br />
            <br />
            <div className=" row">
              {postdata
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.product_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val, index) => (
                  <div className="col-md-3 product">
                    <div >
                      <img
                        src={val.product_image}
                        className="card-img-top"
                        alt="..."
                        height="250px"
                        onClick={() => singleitem(val._id)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          onClick={() => singleitem(val._id)}
                        >
                          {val.product_name}
                        </h5>
                        <hr />
                        <h6 className="card-text">Price: {val.product_cost}</h6>
                        
                        <h6 className="card-text">
                          Material : {val.product_material}
                        </h6>
                        <h6 className="card-text">
                          Dimension:{val.product_dimension}
                        </h6>
                       
                   


                      
      <div>
        <StarsRating
          onStarsRated={(value) => {
            alert(` You rated this product ${value}`);
          }}
          onSelecting={(isSelecting, selectingValue) => {
            setSelecting({ isSelecting, selectingValue });
          }}
          config={config}
        />
      </div>
                        


                        <br/>
                        <button class="add" onClick={() => addtoCart(val)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="container bg-light ">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={postdata.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Product;
