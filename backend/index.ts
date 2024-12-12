import cors from 'cors';
import * as dotenv from 'dotenv';
import { Client } from 'pg';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

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


app.get('/api/users', async (req: Request, res: Response) => {

})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})