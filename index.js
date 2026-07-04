const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Test route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});


// app.get("/getCrop", (req, res) => {
//     res.send("GET route working");
// });



const db = mysql.createConnection({
    host: "localhost",
    port:3307,
    user: "root",
    password: "", // your MySQL password
    database: "crop_management"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");

    // Check which database Node.js is actually using
    db.query("SELECT DATABASE() AS db", (err, result) => {
        if (err) throw err;
        console.log("Currently using database:", result[0].db);
    });
});





app.post("/register", (req, res) => {
      console.log("Incoming data:", req.body); 
    const { full_name, mobile, email, password } = req.body;

    const sql = "INSERT INTO users (full_name, mobile, email, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [full_name, mobile, email, password], (err, result) => {
        if (err) {
           // console.log(err);
             console.log("SQL ERROR:", err); 
            res.send("Error inserting data ❌");
        } else {
            console.log("Inserted ID:", result.insertId);
            res.send("User registered successfully ✅");
        }
    });
});


// NEW route for crop recommendation
app.post("/getCrop", (req, res) => {

    const { full_name, mobile, email, area, soil_type, irrigation, season } = req.body;

    //  Insert farmer data first
    const insertSql = `
        INSERT INTO farmer_data 
        (full_name, mobile, email, area, soil_type, irrigation, season)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertSql, [full_name, mobile, email, area, soil_type, irrigation, season], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ crop_name: "Error saving data" });
        }

        const insertedId = result.insertId; //  IMPORTANT

        //  Fetch crop
       const cropSql = `SELECT crop_name FROM crops 
                WHERE LOWER(season)=LOWER(?) AND LOWER(soil_type)=LOWER(?) 
                    LIMIT 1`;


        db.query(cropSql, [season, soil_type], (err, cropResult) => {
            if (err) {
                console.log(err);
                return res.json({ crop_name: "Error fetching crop" });
            }

            const cropName = cropResult.length > 0 ? cropResult[0].crop_name : "No crop";

            //  UPDATE the same row with crop name 
            const updateSql = "UPDATE farmer_data SET crop_name=? WHERE id=?";
            db.query(updateSql, [cropName, insertedId]);

            //  Send response to frontend
            res.json({ crop_name: cropName });
        });
    });
});

app.get("/getAllFarmers", (req, res) => {
    db.query("SELECT * FROM farmer_data", (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching data");
        }
        res.json(result);
    });
});

app.put("/updateFarmer/:id", (req, res) => {
    const { full_name, mobile, email, area, soil_type, irrigation, season } = req.body;
    const id = req.params.id;

    const sql = `
        UPDATE farmer_data 
        SET full_name=?, mobile=?, email=?, area=?, soil_type=?, irrigation=?, season=? 
        WHERE id=?
    `;

    db.query(sql, [full_name, mobile, email, area, soil_type, irrigation, season, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error updating data ❌");
        }
        res.send("Data updated successfully ✅");
    });
});


app.delete("/deleteFarmer/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM farmer_data WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error deleting data ❌");
        }
        res.send("Data deleted successfully ✅");
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});