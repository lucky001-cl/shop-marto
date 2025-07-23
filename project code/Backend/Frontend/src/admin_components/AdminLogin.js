import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate, } from 'react-router-dom';
import Cookies from 'js-cookies'
import Header from '../components/Header';

const commonFields = [
    { controlId: 'email', label: 'Email', type: 'email' },
    { controlId: 'password', label: 'Password', type: 'password' },
];

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const token = Cookies.getItem('jwtToken');
    const adminToken = localStorage.getItem('adminJwtToken');

    useEffect(() => {
        console.log(adminToken)
        if (token) {
            navigate('/'); // Redirect to home if token exists
        } else if (adminToken) {
            navigate('/admin/all-products'); // Redirect to admin if an admin token exists
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5100/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    Cookies.setItem('jwtToken', data.token, { expires: 30 });
                    Cookies.setItem('userId', data.user._id);
                    Cookies.setItem('userName', data.user.firstname);
                    navigate('/');
                } else if (data.jwtToken) {
                    localStorage.setItem('adminJwtToken', data.jwtToken, { expires: 30 });
                    Cookies.setItem('userName', data.user.firstname);
                    navigate('/admin/dashboard');
                }
            } else {
                alert("Email or Password didn't match");
            }
        } catch (error) {
            alert('Error during login:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlelogin=()=>{
        alert('Login Successfull')
        navigate('/admin/dashboard')
    }

    return (
       <div>
        <Header/>
         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '10vh' }}>
            <Card className="shadow p-4" style={{ width: '400px' }}>
                <Card.Body>
                    <h2 className="mb-4">Login</h2>
                    <Form >
                        {commonFields.map((field) => (
                            <Form.Group style={{ textAlign: 'start', marginBottom: '10px' }} controlId={field.controlId} key={field.controlId}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    name={field.controlId}
                                    value={formData[field.controlId]}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        ))}
                        <Button onClick={handlelogin} className="btn-primary w-100 mt-3">Login</Button>
                    </Form>
                    <p >
                        Don't have an account? <Link to="/asignup">Sign Up</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>

       </div>
          );
};

export default AdminLogin;


