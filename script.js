// Wallet connection code
const connectButton = document.getElementById('connectButton');
const statusText = document.getElementById('status');

async function connectWallet() {
    try {
        // Check if Phantom is installed
        if (window.solana && window.solana.isPhantom) {
            // Connect to Phantom wallet
            await window.solana.connect();
            statusText.textContent = 'Connected to Phantom Wallet';
        } else {
            throw new Error('Phantom wallet not installed.');
        }
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        statusText.textContent = 'Error connecting to wallet. Please make sure Phantom wallet is installed.';
    }
}

connectButton.addEventListener('click', connectWallet);

// Import the required modules
const solana = require('@solana/web3.js');
const {
  SystemProgram,
  Client,
  Transaction,
} = solana;

// Define the token's symbol and name
const symbol = 'MYTOKEN';
const name = 'My Token';
// Define the decimal places
const decimalPlaces = 8;
// Define the total supply
const totalSupply = 100000000;
// Define the initial balance of the token contract
const initialBalance = totalSupply * Math.pow(10, decimalPlaces);
// Define the token contract's public key
const tokenKey = 'TokenPublicKey';
// Define the token's program ID
const programId = new solana.PublicKey('TokenProgramId');

// Define the function to initialize the token contract
async function initializeToken(client) {
  const transaction = new solana.Transaction();  

  // Add the required instructions to the transaction
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: client.provider.wallet.publicKey,
      newAccountPubkey: tokenKey,
      lamports: await client.provider.connection.getMinimumBalanceForRentExemption(0),
      space: 165, // Adjust the space as per token account size
      programId,
    }),
    solana.Token.createInitTokenInstruction(
      programId, // Token program ID
      tokenKey, // New token account
      decimalPlaces, // Number of decimals
      client.provider.wallet.publicKey, // Owner
      [] // Initializers
    )
  );

  // Sign and submit the transaction
  const signature = await client.provider.send(transaction, [client.provider.wallet]);
  await client.provider.connection.confirmTransaction(signature, 'processed');
  return signature;
}

// Connect to the Solana network
const client = new Client(new solana.Cluster('https://testnet.solana.com'));

// Initialize the token contract
initializeToken(client)
  .then((result) => {
    console.log('Token contract created:', result);
  })
  .catch((error) => {
    console.error(error);
  });
