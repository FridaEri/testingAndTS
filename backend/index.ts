import cors from 'cors';
import * as dotenv from 'dotenv';
import { Client } from 'pg';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI
});

client.connect();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies


// Sign-up route
app.post('/api/user', async (req: Request, res: Response) => {
  const { name, email, address, postalCode, password } = req.body;

  try {
    // Check if the user already exists
    const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await client.query(
      'INSERT INTO users (name, email, address, postal_code, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, address, postalCode, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Login in for user
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (user) {
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate a unique token
        const token = uuidv4();

        // Insert the token into the 'tokens' table, linking it to the user_id
        await client.query(
          'INSERT INTO tokens (user_id, token) VALUES ($1, $2)',  
          [user.id, token]
        );

        // Send the token back to the client
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid email or password. Please try again!' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password. Please try again!' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})