import React, { useState } from "react";
import axios from "axios";
import "./ItemStyles.css";

const ItemForm = () => {
    const [items, setItems] = useState([{ name: "", item_type: "", purchase_date: "", stock_available: false }]);

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const updatedItems = [...items];
        updatedItems[index][name] = type === "checkbox" ? checked : value;
        setItems(updatedItems);
    };

    const addNewItem = () => {
        setItems([...items, { name: "", item_type: "", purchase_date: "", stock_available: false }]);
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/items/bulk-create/", { items });
            alert("Items added successfully!");
            setItems([{ name: "", item_type: "", purchase_date: "", stock_available: false }]);
        } catch (error) {
            console.error("Error adding items:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add Multiple Items</h2>
            <form onSubmit={handleSubmit}>
                {items.map((item, index) => (
                    <div key={index} className="item-group">
                        <input type="text" name="name" value={item.name} placeholder="Item Name" onChange={(e) => handleInputChange(index, e)} required />
                        <input type="date" name="purchase_date" value={item.purchase_date} onChange={(e) => handleInputChange(index, e)} required />
                        <input type="text" name="item_type" value={item.item_type} placeholder="Item Type" onChange={(e) => handleInputChange(index, e)} required />
                        <label>
                            <input type="checkbox" name="stock_available" checked={item.stock_available} onChange={(e) => handleInputChange(index, e)} />
                            In Stock
                        </label>
                        <button type="button" className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
                    </div>
                ))}

                <button type="button" className="add-btn" onClick={addNewItem}>Add Another Item</button>
                <button type="submit">Submit Items</button>
            </form>
        </div>
    );
};

export default ItemForm;
