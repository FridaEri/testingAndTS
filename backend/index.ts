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

// Fetch user data
app.get('/api/users', async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing. Please login.' });
  }

  try {
    const result = await client.query('SELECT user_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid Token. Please login.' });
    }

    const userResult = await client.query('SELECT * FROM users WHERE id = $1', [tokenData.user_id]);
    const user = userResult.rows[0];

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/users', async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing. Please login.' });
  }

  try {
    // Verify token
    const result = await client.query('SELECT user_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid Token. Please login.' });
    }

    const userResult = await client.query('SELECT * FROM users WHERE id = $1', [tokenData.user_id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get fields from the request body
    const { name, email, address, postal_code, password } = req.body;
    let hashedPassword = user.password; // Default to existing password

    // Only hash the new password if it's provided
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Perform update
    const updateResult = await client.query(
      'UPDATE users SET name = $1, email = $2, address = $3, postal_code = $4, password = $5 WHERE id = $6 RETURNING *',
      [name, email, address, postal_code, hashedPassword, tokenData.user_id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(400).json({ message: 'No changes made or user not found' });
    }

    const updatedUser = updateResult.rows[0];

    console.log('Updated user data:', updatedUser); // Debug log
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user account
app.delete('/api/users', async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing. Please login.' });
  }

  try {
    const result = await client.query('SELECT user_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid token. Please login.' });
    }

    const userResult = await client.query('SELECT * FROM users WHERE id = $1', [tokenData.user_id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Could not find user' });
    }

    await client.query('DELETE FROM users WHERE id = $1', [tokenData.user_id]);
    await client.query('DELETE FROM tokens WHERE token = $1', [token]);

    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/meal-plan-items', async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing. Please login.' });
  }

  try {
    // Verify the token and fetch the user_id
    const tokenResult = await client.query('SELECT user_id FROM tokens WHERE token = $1', [token]);
    const tokenData = tokenResult.rows[0];
    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid token. Please login.' });
    }

    const userId = tokenData.user_id;

    // Extract recipe data from the request body
    const { name, description, ingredients, instructions, dayOfWeek, weekNumber } = req.body;

    if (!name || !ingredients || !instructions || !dayOfWeek || !weekNumber) {
      return res.status(400).json({ message: 'Missing required fields: name, ingredients, instructions, dayOfWeek, or weekNumber.' });
    }

    // Insert the recipe into the database
    const recipeQuery = `
      INSERT INTO recipes (user_id, name, description, ingredients, instructions)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const recipeResult = await client.query(recipeQuery, [
      userId,
      name,
      description,
      JSON.stringify(ingredients),
      instructions,
    ]);

    const recipeId = recipeResult.rows[0].id;

    // Ensure the meal plan exists or create it manually
    const mealPlanQuery = `
      SELECT id FROM meal_plans
      WHERE user_id = $1 AND week_number = $2;
    `;
    const mealPlanResult = await client.query(mealPlanQuery, [userId, weekNumber]);

    let mealPlanId = mealPlanResult.rows[0]?.id;

    // If no meal plan is found, create one
    if (!mealPlanId) {
      const insertMealPlanQuery = `
        INSERT INTO meal_plans (user_id, week_number)
        VALUES ($1, $2)
        RETURNING id;
      `;
      const insertMealPlanResult = await client.query(insertMealPlanQuery, [userId, weekNumber]);
      mealPlanId = insertMealPlanResult.rows[0].id;
    }

    // Ensure no duplicate recipes for the same day
    const checkDuplicateQuery = `
      SELECT 1 FROM meal_plan_items
      WHERE meal_plan_id = $1 AND day_of_week = $2;
    `;
    const duplicateResult = await client.query(checkDuplicateQuery, [mealPlanId, dayOfWeek]);

    if (duplicateResult.rows.length > 0) {
      return res.status(400).json({ message: 'A recipe is already assigned to this day of the week.' });
    }

    // Add the recipe to the meal plan
    const insertMealPlanItemQuery = `
      INSERT INTO meal_plan_items (meal_plan_id, recipe_id, day_of_week)
      VALUES ($1, $2, $3);
    `;
    await client.query(insertMealPlanItemQuery, [mealPlanId, recipeId, dayOfWeek]);

    res.status(201).json({ message: 'Recipe successfully added to the meal plan.' });
  } catch (error) {
    console.error('Error adding recipe to meal plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/meal-plans/:weekNumber', async (req: Request, res: Response) => {
  const { weekNumber } = req.params;
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token.' });
  }

  try {
    const tokenResult = await client.query('SELECT user_id FROM tokens WHERE token = $1', [token]);
    const tokenData = tokenResult.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid token. Please login.' });
    }

    const userId = tokenData.user_id;

    const query = `
      SELECT mpi.day_of_week, r.name, r.description, r.ingredients, r.instructions
      FROM meal_plan_items mpi
      JOIN meal_plans mp ON mpi.meal_plan_id = mp.id
      JOIN recipes r ON mpi.recipe_id = r.id
      WHERE mp.user_id = $1 AND mp.week_number = $2
      ORDER BY mpi.day_of_week;
    `;

    const result = await client.query(query, [userId, weekNumber]);

    const mealPlan = result.rows;
    if (mealPlan.length === 0) {
      return res.status(404).json({ message: `No meal plan found for week ${weekNumber}.` });
    }

    res.status(200).json(mealPlan);
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})