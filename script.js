// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { createToken } = require('./createToken'); // Assuming your createToken function is in a file called createToken.js

const app = express();
app.use(bodyParser.json());

// Endpoint to handle token creation request
app.post('/createToken', async (req, res) => {
  const { tokenInfo, revokeMint, revokeFreeze } = req.body; // Assuming the request body contains tokenInfo, revokeMint, and revokeFreeze fields
  try {
    const tokenAddress = await createToken(tokenInfo, revokeMint, revokeFreeze);
    res.status(200).json({ success: true, tokenAddress });
  } catch (error) {
    console.error('Error creating token:', error);
    res.status(500).json({ success: false, error: 'Token creation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
