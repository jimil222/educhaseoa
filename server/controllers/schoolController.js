import pool from "../configs/db.js";

// Add School function
export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({ message: "School added successfully", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Schools (sorted by distance)
export const listSchools = async (req, res) => {
  try {
    let { latitude, longitude } = req.query;

    // Convert to numbers
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: "Invalid user coordinates" });
    }

    const [schools] = await pool.query("SELECT * FROM schools");

    // Haversine formula
    const calcDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };

    // Sorting mechanism
    const sortedSchools = schools.map(school => ({
      ...school,
      distance: calcDistance(latitude, longitude, school.latitude, school.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

