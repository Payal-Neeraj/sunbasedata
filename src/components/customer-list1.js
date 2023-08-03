import React, { useState, useEffect } from 'react';
import CreateCustomer from './create-customer';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customer list and update state
    const fetchCustomerList = async () => {
      const apiUrl = '/assignment.jsp';
      const headers = {
        Authorization: `Bearer ${token}`
      };

      try {
        const response = await fetch(`${apiUrl}?cmd=get_customer_list`, {
          method: 'GET',
          headers: headers
        });

        if (response.ok) {
          const data = await response.json();
          setCustomerList(data);
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching customer list:', error);
      }
    };

    fetchCustomerList();
  }, [token]);

  const handleUpdate = async (updatedCustomer) => {
    const apiUrl = `/assignment.jsp?cmd=update&uuid=${updatedCustomer.uuid}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(updatedCustomer)
      });

      if (response.status === 200) {
        const updatedList = customerList.map(customer =>
          customer.uuid === updatedCustomer.uuid ? updatedCustomer : customer
        );
        setCustomerList(updatedList);
        setSelectedCustomer(null);
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Failed to update customer:', errorData.message);
      } else if (response.status === 500) {
        console.error('UUID not found');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCancelEdit = () => {
    setSelectedCustomer(null);
  };

  const handleChange = (e, field, customer) => {
    const updatedValue = e.target.value;
    const updatedList = customerList.map(c =>
      c.uuid === customer.uuid ? { ...c, [field]: updatedValue } : c
    );
    setCustomerList(updatedList);
  };

  const handleDelete = async (uuid) => {
    const apiUrl = '/assignment.jsp';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`${apiUrl}?cmd=delete&uuid=${uuid}`, {
        method: 'POST',
        headers: headers
      });

      if (response.status === 200) {
        // Refresh the customer list after successful deletion
        const updatedList = customerList.filter(customer => customer.uuid !== uuid);
        setCustomerList(updatedList);
      } else if (response.status === 400) {
        console.error('UUID not found');
      } else if (response.status === 500) {
        console.error('Error deleting customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };


//   const fetchCustomerList = async () => {
//     const apiUrl = '/assignment.jsp';
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
  
//     try {
//       const response = await fetch(`${apiUrl}?cmd=get_customer_list`, {
//         method: 'GET',
//         headers: headers
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setCustomerList(data);
//       } else {
//         console.error('API request failed:', response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching customer list:', error);
//     }
//   };
  



  return (
    <div align="center">
        
      <h1>Customer List</h1>
      <button onClick={()=>navigate("/create-customer")}>Add Customer</button>
      <table>
        <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
        </thead>
        <tbody>
          {customerList.map(customer => (
            <tr key={customer.uuid}>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.first_name}
                    onChange={(e) => handleChange(e, 'first_name', customer)}
                  />
                ) : (
                  customer.first_name
                )}
              </td>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.last_name}
                    onChange={(e) => handleChange(e, 'last_name', customer)}
                  />
                ) : (
                  customer.last_name
                )}
              </td>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => handleChange(e, 'address', customer)}
                  />
                ) : (
                  customer.address
                )}
              </td>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => handleChange(e, 'city', customer)}
                  />
                ) : (
                  customer.city
                )}
              </td><td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => handleChange(e, 'state', customer)}
                  />
                ) : (
                  customer.state
                )}
              </td>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.email}
                    onChange={(e) => handleChange(e, 'email', customer)}
                  />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {selectedCustomer === customer ? (
                  <input
                    type="text"
                    value={customer.phone}
                    onChange={(e) => handleChange(e, 'phone', customer)}
                  />
                ) : (
                  customer.phone
                )}
              </td>
              {/* ... (other table cells) */}
              <td>
                {selectedCustomer === customer ? (
                  <>
                    <button onClick={() => handleUpdate(customer)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(customer)}>Edit</button>
                )}
                <button onClick={() => handleDelete(customer.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
