import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ItemStyles.css"; // Import CSS

const ItemTypeForm = () => {
    const [formData, setFormData] = useState({ type_name: "" });
    const [itemTypes, setItemTypes] = useState([]);

    // Fetch existing item types
    useEffect(() => {
        fetchItemTypes();
    }, []);

    const fetchItemTypes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/item-types/");
            setItemTypes(response.data);
        } catch (error) {
            console.error("Error fetching item types:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/item-types/", formData);
            alert("Item Type added successfully!");
            setFormData({ type_name: "" }); // Reset form
            fetchItemTypes(); // Refresh list
        } catch (error) {
            console.error("Error adding item type:", error);
        }
    };

    return (
        <div className="container">
            <h2>Manage Item Types</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="type_name"
                    placeholder="Item Type Name"
                    value={formData.type_name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Item Type</button>
            </form>

            <h3>Existing Item Types</h3>
            <select>
                <option value="">Select Item Type</option>
                {itemTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.type_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemTypeForm;
