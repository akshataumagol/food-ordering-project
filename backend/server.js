const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3004;

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'food',
});

const shoppingCart = [];


db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Simple example: storing passwords in plain text (not recommended for production)
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication with MySQL database (this is a simplified example)
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login query:', err);
      res.json({ success: false });
    } else {
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  });
});
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving contact:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    } else {
      res.json({ success: true, message: 'Contact saved successfully' });
    }
  });
});
app.get('/api/menu', (req, res) => {
  const query = 'SELECT * FROM menu_items';
 console.log("query", query);
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching menu items:', error);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
console.log(results)
    if (!results || results.length === 0) {
      console.error('No menu items found');
      return res.status(404).json({ error: 'No menu items found' });
    }

    console.log('Menu items fetched successfully:', results);
    res.status(200).json(results);
  });
});


/*app.get('/api/cart', (req, res) => {
  res.json(shoppingCart);
});
*/
// API to add an item to the cart
app.post('/api/addToCart', (req, res) => {
  const { userId, itemId, quantity } = req.body;
  
  // Insert the item into the cart table along with the user ID
  const query = `INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)`;
  db.query(query, [userId, itemId, quantity], (error, results) => {
    if (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ error: 'Failed to add item to cart' });
    } else {
      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  });
});

// API to remove an item from the cart
app.post('/api/removeFromCart', (req, res) => {
  const { productId, quantity } = req.body;
  const existingItem = shoppingCart.find(item => item.product.id === productId);

  if (existingItem) {
    if (existingItem.quantity > quantity) {
      existingItem.quantity -= quantity;
    } else {
      const index = shoppingCart.indexOf(existingItem);
      shoppingCart.splice(index, 1);
    }

    res.json({ message: 'Item removed from cart', cart: shoppingCart });
  } else {
    res.status(404).send('Item not found in cart');
  }
});



app.post('/api/cart', (req, res) => {
  const { userId, itemId, quantity } = req.body;
  
  // Insert the item into the cart table along with the user ID
  const query = `INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)`;
  db.query(query, [userId, itemId, quantity], (error, results) => {
    if (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    } else {
      res.status(201).json({ message: 'Item added to cart successfully' });
    }
  });
});

// Endpoint to retrieve cart items for a specific user
/*app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Retrieve cart items for the given user ID
  const query = `SELECT * FROM cart WHERE user_id = ?`;
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    } else {
      res.json(results);
    }
  });
});*/
// API to get the total price

function calculateTotalPrice() {
  // Replace this with logic to calculate the total price from the shoppingCart array
  // Example: Loop through shoppingCart and sum the prices of items
  let totalPrice = 0;
  for (const item of shoppingCart) {
    totalPrice += item.product.price * item.quantity;
  }
  return totalPrice;
}

app.get('/api/totalPrice', (req, res) => {
  // Replace this with your logic to calculate the total price
  const totalPrice = calculateTotalPrice();

  res.json({ totalPrice });
});

// Function to calculate the total price (replace this with your logic)

app.post('/api/checkout', (req, res) => {
  const { billingAddress, paymentDetails, totalAmount } = req.body;

  // Insert data into billing_addresses table
  db.query('INSERT INTO billing_addresses SET ?', billingAddress, (error, results) => {
    if (error) {
      console.error('Error inserting into billing_addresses:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const billingAddressId = results.insertId;
    //const totalAmount = calculateTotalPrice();

    // Insert data into payment_details table
    const paymentDetailsData = {
      cardName: paymentDetails.cardName,
      cardNumber: paymentDetails.cardNumber,
      cvv: paymentDetails.cvv,
      cartItems: JSON.stringify(paymentDetails.cartItems),
      totalAmount: totalAmount,
    };

    db.query('INSERT INTO payment_details SET ?', paymentDetailsData, (error, results) => {
      if (error) {
        console.error('Error inserting into payment_details:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const paymentDetailsId = results.insertId;

      // Now you have the IDs of the inserted records, you can use them as needed

      // Additional logic (e.g., sending a response to the client)
      const responseData = {
        billingAddressId,
        paymentDetailsId,
        totalAmount,
      };

      res.status(200).json(responseData);
    });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
