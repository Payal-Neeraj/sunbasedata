import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Retrieve token from local storage


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/assignment.jsp';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await fetch(`${apiUrl}?cmd=create`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        setMessage('Customer created successfully');
      } else if (response.status === 400) {
        const errorData = await response.json();
        setMessage(`Failed to create customer: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      setMessage('An error occurred while creating the customer');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Create Customer</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label><br/><br/>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required /><br/><br/>
        </label>
        <label>
          Street:
          <input type="text" name="street" value={formData.street} onChange={handleChange}  /><br/><br/>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange}  /><br/><br/>
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange}  /><br/><br/>
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange}  /><br/><br/>
        </label>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange}  /><br/><br/>
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange}  /><br/><br/>
        </label>
        <button type="submit">Create Customer</button><br></br>
        <button onClick={()=>navigate("/customer-list1")}>Go to Customer List</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
