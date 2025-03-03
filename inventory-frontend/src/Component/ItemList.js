import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ItemStyles.css"; // Import CSS

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/items/");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="container">
            <h2>Item List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Type</th>
                        <th>Purchase Date</th>
                        <th>Stock Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.item_type}</td>
                            <td>{item.purchase_date}</td>
                            <td>{item.stock_available ? "Yes" : "No"}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
