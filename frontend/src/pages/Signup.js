import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/signup", formData);
        alert("Signup successful!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;