const bcrypt = require('bcrypt');  // Ensure bcrypt is installed

const { pool } = require('../../config/db');  // Assuming you're using the pool from db.js

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );

        // Send response with created user
        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0],  // Return the user that was just created
        });
    } catch (error) {
        console.log("(usercontroller.js) error registering user : ", error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const loginUser = async(req, res) => {
    const {username, password} = req.body;
    try {

        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        console.log("result : ", result);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username }
        });
    }
    catch(error) {
        console.log('Error logging in user: ', error);
        res.status(500).json({ message: 'Server error' });    }
};

module.exports = { registerUser, loginUser };