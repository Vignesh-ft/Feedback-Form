require("dotenv").config();
const ExcelJS = require("exceljs");
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors")
const fs = require('fs')


const app = express();
const port = 3500;

// PostgreSQL Connection
const pool = new Pool({
    user: process.env.RDS_DB_USER,
    host: process.env.RDS_DB_HOST,
    database: process.env.RDS_DB_NAME,
    password: process.env.RDS_DB_PASSWORD,
    port: process.env.RDS_DB_PORT,
    ssl: {
        rejectUnauthorized: false // Set to true if you have a valid SSL certificate
      }  
});

app.use(express.json());
app.use(cors())

app.post("/items", async (req, res) => {
    try {
        const { name } = req.body; // Extract name from request body

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const query = "SELECT item_code FROM item_data;";
        const result = await pool.query(query);

        // Extract item_code values into an array
        const itemCodes = result.rows.map(row => row.item_code);

        res.status(200).json({ name: name, data: itemCodes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/bin_number", async (req, res) => {
    try {
        const { name } = req.body; // Extract name from request body

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const query = "SELECT bin_number FROM stores_data;";
        const result = await pool.query(query);

        // Extract item_code values into an array
        const itemCodes = result.rows.map(row => row.bin_number);

        res.status(200).json({ name: name, data: itemCodes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// POST API to insert data
app.post("/stores", async (req, res) => {
    const { name, date, time, item_code, quantity, bin_number } = req.body;
    if (!name || !date || !time || !item_code || !quantity || !bin_number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const query = `
            INSERT INTO stores_data (name, date, time, item_code, quantity, bin_number)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [name, date, time, item_code, quantity, bin_number];
        const result = await pool.query(query, values);
        res.status(201).json({ message: "Data inserted successfully", data: result.rows[0], uploaded: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error", uploaded: false });
    }
});

// GET API to download stores_data as an Excel file
app.get("/download", async (req, res) => {
    try {
        const query = "SELECT * FROM stores_data;";
        const result = await pool.query(query);
        const data = result.rows;

        if (data.length === 0) {
            return res.status(404).json({ error: "No data available" });
        }

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Stores Data");

        // Add column headers
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Name", key: "name", width: 20 },
            { header: "Date", key: "date", width: 15 },
            { header: "Time", key: "time", width: 15 },
            { header: "Item Code", key: "item_code", width: 20 },
            { header: "Quantity", key: "quantity", width: 10 },
            { header: "Bin Number", key: "bin_number", width: 15 }
        ];

        // Add rows to the worksheet
        data.forEach(row => {
            worksheet.addRow(row);
        });

        // Generate file path
        const filePath = path.join(__dirname, "stores_data.xlsx");

        // Write the Excel file
        await workbook.xlsx.writeFile(filePath);

        // Send the file as a response
        res.download(filePath, "stores_data.xlsx", (err) => {
            if (err) {
                console.error("File download error:", err);
                res.status(500).json({ error: "File download failed" });
            }
            // Delete file after sending response
            fs.unlinkSync(filePath);
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
