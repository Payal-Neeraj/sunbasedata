// UpdateCustomer.js
import React, { useState } from 'react';

const UpdateCustomer = ({ customer, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: customer.first_name,
    last_name: customer.last_name,
    street: customer.street,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    email: customer.email,
    phone: customer.phone
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `assignment.jsp?cmd=update&uuid=${customer.uuid}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        setMessage('Customer updated successfully');
        onUpdate(formData); // Notify parent component about updated customer
      } else if (response.status === 400) {
        const errorData = await response.json();
        setMessage(`Failed to update customer: ${errorData.message}`);
      } else if (response.status === 500) {
        console.error('UUID not found');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      setMessage('An error occurred while updating the customer');
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
      <h2>Update Customer</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* ... (input fields for first_name, last_name, street, address, city, state, email, phone) */}
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;

