import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoaderSpinner from '../../components/LoaderSpinner';
import AdminNavbar from '../AdminNavbar';

// Styled components
const Container = styled.div`
  text-align: start;
`;

const Heading = styled.h1`
  color: rgb(62, 62, 62);
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
`;

const OrderDetail = styled.p`
  margin: 5px 0;
`;

const Button = styled.button`
  background-color: rgb(98, 90, 252);
  color: #fff;
  width: 150px;
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(68, 60, 196);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [statusForm, setStatusForm] = useState({
    status: 'Confirmed', // Default status
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5100/orders')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  const onSubmit = (formData) => {
    axios.put(`http://localhost:5100/orders/${selectedOrderId}`, formData)
      .then(() => {
        setIsUpdate(false);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeStatus = (orderId) => {
    setIsUpdate(true);
    setSelectedOrderId(orderId);
  };

  return (
    <div>
      <AdminNavbar />
      {isLoading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoaderSpinner />
        </div>
      ) : (
        <Container className="container">
          <h1 className='text-center'>Orders</h1>
          {data.length === 0 ? (
            <div>
              <p>No orders in your shop!</p>
            </div>
          ) : (
            <div>
              {isUpdate ? (
                <div>
                  <form onSubmit={(e) => { e.preventDefault(); onSubmit(statusForm); }}>
                    <div className="form-group">
                      <label htmlFor="statusSelect">Select Status</label>
                      <select className="form-control" id="statusSelect" value={statusForm.status} onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </div>
              ) : null}
              {!isUpdate && data.map((item) => (
                <OrderCard key={item._id}>
                  <OrderDetail><strong>Order ID:</strong> {item._id}</OrderDetail>
                  <OrderDetail><strong>Fullname:</strong> {item.firstname} {item.lastname}</OrderDetail>
                  <OrderDetail><strong>Phone:</strong> {item.phone}</OrderDetail>
                  <OrderDetail><strong>Product ID:</strong> {item.productId}</OrderDetail>
                  <OrderDetail><strong>Quantity:</strong> {item.quantity}</OrderDetail>
                  <OrderDetail><strong>Total price:</strong> {item.price}</OrderDetail>
                  <OrderDetail><strong>Payment Method:</strong> {item.paymentMethod}</OrderDetail>
                  <OrderDetail><strong>Address:</strong> {item.address}</OrderDetail>
                  <OrderDetail><strong>Created At:</strong> {item.createdAt}</OrderDetail>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <OrderDetail><strong>Status:</strong> {item.status}</OrderDetail>
                    {item.status !== 'Canceled' && item.status !== 'Delivered' && <Button onClick={() => onChangeStatus(item._id)} disabled={item.status === 'Delivered'}>Update Status</Button>}
                    {item.status === 'Canceled' && <Button disabled={item.status === 'Canceled'}>Customer Canceled</Button>}
                    {item.status === 'Delivered' && <Button disabled={item.status === 'Delivered'}>Delivered</Button>}
                  </div>
                </OrderCard>
              ))}
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Orders;
