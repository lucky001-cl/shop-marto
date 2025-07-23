import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import ProductItem from '../ProductItem';
import Cookies from 'js-cookies';
import axios from 'axios';
import AdminNavabar from '../AdminNavbar';

const ProductsContainer = styled.div`
  margin-top: 4vh;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;
`;

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Display 4 items in each row
  gap: 20px;
  padding: 0;
`;


const AdminProducts = () => {
  const api = 'http://localhost:5100/products';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(api)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleDeleteProduct = async (id) => {
    const userId = Cookies.getItem("userId"); 
    try {
      await axios.delete(`http://localhost:5100/products/${id}`);
      getData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <AdminNavabar />
      <h1 className='text-center'>Products</h1>
      <ProductsContainer>
        <StyledList>
          {products.map(product => (
            <ProductItem
              key={product._id}
              id={product._id}
              img={product.image}
              name={product.productname}
              description={product.description}
              price={product.price}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </StyledList>
      </ProductsContainer>
    </div>
  );
};

export default AdminProducts;
