import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ItemStyles.css"; // Import CSS

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

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

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditFormData(item);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/items/${id}/`, editFormData);
            setItems(items.map(item => (item.id === id ? editFormData : item)));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating item:", error);
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
                            {editingId === item.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="item_type"
                                            value={editFormData.item_type}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="purchase_date"
                                            value={editFormData.purchase_date}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="stock_available"
                                            value={editFormData.stock_available}
                                            onChange={handleChange}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleUpdate(item.id)}>Save</button>
                                            <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.name}</td>
                                    <td>{item.item_type}</td>
                                    <td>{item.purchase_date}</td>
                                    <td>{item.stock_available ? "Yes" : "No"}</td>
                                    <td>
                                        <div className="button-group">
                                            <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
