import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ItemStyles.css"; // Import CSS

const ItemForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        item_type: "",
        purchase_date: "",
        stock_available: false,
    });

    const [itemTypes, setItemTypes] = useState([]); // Store item types

    // Fetch item types from the backend
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/item-types/")
            .then(response => {
                setItemTypes(response.data);
            })
            .catch(error => {
                console.error("Error fetching item types:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setFormData({
            ...formData,
            [name]: name === "item_type" ? parseInt(value, 10) : type === "checkbox" ? checked : value
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/items/", formData);
            alert("Item added successfully!");
            setFormData({ name: "", item_type: "", purchase_date: "", stock_available: false });
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* Dropdown for Item Type */}
                <select name="item_type" value={formData.item_type} onChange={handleChange} required>
                    <option value="">Select Item Type</option>
                    {itemTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.type_name}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="purchase_date"
                    value={formData.purchase_date}
                    onChange={handleChange}
                    required
                />

                <label>
                    <input
                        type="checkbox"
                        name="stock_available"
                        checked={formData.stock_available}
                        onChange={handleChange}
                    />
                    Stock Available
                </label>

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default ItemForm;
