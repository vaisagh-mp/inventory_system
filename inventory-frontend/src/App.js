import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemForm from "./Component/ItemForm";
import ItemList from "./Component/ItemList";
import ItemTypeForm from "./Component/ItemTypeForm";
import "./Component/NavBar.css";  // Import the CSS

const App = () => {
    return (
        <Router>
            <div>
                <h1>Inventory Management</h1>
                
                {/* Styled Navigation */}
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/item-types">Manage Item Types</Link></li>
                    </ul>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={
                        <>
                            <ItemForm />
                            <ItemList />
                        </>
                    } />
                    <Route path="/item-types" element={<ItemTypeForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
