import React, { useState } from 'react';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    releaseDate: '',
    productAvailable: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/api/products", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success', data);
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error adding product.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" onChange={handleChange} />
        <input type="date" name="releaseDate" placeholder="Release Date" onChange={handleChange} />
        <select name="productAvailable" onChange={handleChange}>
          <option value="">-- Availability --</option>
          <option value="true">Available</option>
          <option value="false">Out of Stock</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddProduct;
