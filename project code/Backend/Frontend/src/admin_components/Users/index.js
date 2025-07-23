import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table,Card } from 'react-bootstrap';
import { FaTrash,FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminNavabar from '../AdminNavbar'


const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

   useEffect(() => {
    axios.get(`http://localhost:5100/users`)
      .then((response) => {
        setUsers(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError('Failed to fetch projects.');
        // setLoading(false);
      });
}, []);

const deleteData = (taskId) => {
    axios.delete(`http://localhost:5100/userdelete/${taskId}`);
    window.location.assign('/admin/users');
    alert('User is deleted');
  };
  const deleteorder = (taskId) => {
    axios.delete(`http://localhost:5100/userbookingdelete/${taskId}`);
    window.location.assign('/admin/users');
    alert('deleted');
  };


  const fetchUserBikeData = (userId) => {
   
    axios.get(`http://localhost:5100/getbookings/${userId}`)

    .then((response) => {
      setUserbookings(response.data);
      toggleDetails(); // Show Plan Details when data is fetched
    })
    .catch((error) => {
      console.error('Error fetching user bike data:', error);
    });
  };
  const calculateStatus = (date) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(date);

    if (formattedDeliveryDate >= currentDate) {
      return "Upcomming";
    } else {
      return "completed";
    }
  };

  return (
    <div>
      <AdminNavabar/>
    <br />
    <h1 className='text-center'>Users</h1> <br />
    <div style={{display:"flex",justifyContent:"center"}}>
    <Table striped bordered hover variant="dark" style={{width:"70%"}}>
      <thead>
        <tr>
          <th>sl/no</th>
          <th>UserId</th>
          <th>User name</th>
          <th>Email</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item._id}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>
              {/* <button style={{ border: 'none', background: 'none' }}>
                <Link to={`/useredit/${item._id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                  <FaEdit />
                </Link>
              </button> */}
              <button onClick={() => deleteData(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                <FaTrash />
              </button>{' '}
              <Button onClick={() => fetchUserBikeData(item._id)} style={{ marginBottom: '12px' }}>
                view
              </Button>
              <div style={{ display: 'flex' }}>
                {showDetails && (
                  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50" >
                    <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-4 rounded-lg z-10 relative" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                      {/* Rest of your content */}
                      <p className="text-sm text-gray-600">
                        <div className="container mx-auto mt-8" style={{width:"1350px"}}>
                          <h1 className='text-center text-blue-300'>User Bookings</h1>
                          {userbookings.map((item) => {
                             const status = calculateStatus(item.date);
                            return (
                                <Card
                                key={item._id}
                                style={{
                                  width: '90%',
                                  marginLeft: '65px',
                                  backgroundColor: '#fff',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                  borderRadius: '8px',
                                  paddingTop: '15px',
                                  marginBottom: '35px',
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <div >
                                  <img src={`http://localhost:7000/organizer/${item?.templeImage}`} style={{ height: "80px",width:"120px" }} /> 
                                  </div>
                                  <div>
                                    <p>Temple Name:</p>
                                    <p>{item.templeName}</p>
                                  </div>
                                  <div>
                                    <p>Darshan Name:</p>
                                    <p>{item.darshanName}</p>
                                  </div>
                                  <div>
                                    <p>Bookingid:</p>
                                    <p>{item._id.slice(0,10)}</p>
                                  </div>
                                  <div>
                                    <p>Organizer</p>
                                    <p>{item.organizerName}</p>
                                  </div>
                                  <div>
                                    <p>BookingDate</p>
                                    <p>{item.BookingDate}</p>
                                  </div>
                                  <div>
                                    <p>Timings</p>
                                    <p>{item.open}-{item.close}</p>
                                  </div>
                                  <div>
                                    <p>Quantity</p>
                                    <p>{item.quantity}</p>
                                  </div>
                                  <div>
                                    <p>Price</p>
                                    <p>{item.totalamount}</p>
                                  </div>
                                  <div>
                                    <p>Status</p>
                                    <p>{status}</p>
                                  </div>
                                  <button onClick={() => deleteorder(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                <FaTrash />
              </button>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </p>
                      <Button onClick={toggleDetails} className="mt-4">
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  </div>
  
  )
}

export default Users
