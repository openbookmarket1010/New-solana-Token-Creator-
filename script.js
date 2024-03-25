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
