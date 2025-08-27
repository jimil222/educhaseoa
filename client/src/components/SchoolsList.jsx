import { useEffect, useState } from "react";
import axios from 'axios'

const SchoolsList = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState({ latitude: "", longitude: "" });

    const fetchSchools = async () => {
        if (!coords.latitude || !coords.longitude) return;
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/listSchools`, { params: coords });
            setSchools(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setCoords({ ...coords, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (coords.latitude && coords.longitude) fetchSchools();
    }, [coords]);

    return (
        <div className="max-w-xl mx-auto p-6 mt-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Nearby Schools</h2>

            <div className="flex gap-2 mb-4">
                <input type="number" step="0.000001" name="latitude" placeholder="Your Latitude" value={coords.latitude} onChange={handleChange} className="flex-1 p-2 border rounded" />
                <input type="number" step="0.000001" name="longitude" placeholder="Your Longitude" value={coords.longitude} onChange={handleChange} className="flex-1 p-2 border rounded" />
                <button onClick={fetchSchools} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Find</button>
            </div>

            {loading ? <p>Loading...</p> : (
                <ul className="space-y-2">
                    {schools.map(school => (
                        <li key={school.id} className="p-3 border rounded flex justify-between">
                            <div>
                                <p className="font-semibold">{school.name}</p>
                                <p className="text-sm text-gray-600">{school.address}</p>
                            </div>
                            <span className="text-sm text-gray-700">{school.distance.toFixed(2)} km</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SchoolsList;
