import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import Header from "../Header";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "../ProductItem/styledComponents";


const MyCart = () => {
  const userId = Cookies.getItem("userId");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios
      .get(`http://localhost:5100/cart/${userId}`)
      .then((response) => {
        setCartData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const handleCancelClick = (productId) => {
    axios
      .delete(`http://localhost:5100/remove-from-cart/${productId}`)
      .then((response) => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item.productId !== productId)
        );
        getProductsList();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  return (
    <div>
      <Header />
      <br/>
      <br/>
      <h1 className="text-3xl font-semibold mt-8">My Cart</h1>

      <div className="container mx-auto px-4 my-4" >
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cartData.map((product) => (
            <ProductContainer key={product._id} >
              <ProductImage src={product.image} alt={product.productname} />
              <div className="p-4">
                <ProductName className="text-xl font-semibold mb-2">{product.productname}</ProductName>
                <p className="text-gray-700">${product.price}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleCancelClick(product._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove from Cart
                  </button>
                  <Link
                    to={`/order-details/${product._id}`}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Buy this
                  </Link>
                </div>
              </div>
            </ProductContainer>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCart;
