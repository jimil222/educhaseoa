import { useState } from "react";
import axios from "axios";

const AddSchoolForm = () => {
  const [form, setForm] = useState({ name: "", address: "", latitude: "", longitude: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addSchool`, form);
      setMessage(`School added with ID: ${res.data.id}`);
      setForm({ name: "", address: "", latitude: "", longitude: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Add School</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="School Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="number" step="0.000001" name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="number" step="0.000001" name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} className="w-full p-2 border rounded"/>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add School</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AddSchoolForm;
