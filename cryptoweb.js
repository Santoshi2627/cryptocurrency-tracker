// Fetch top cryptocurrencies on page load
window.onload = fetchTopCoins;

// Add event listener for the search button
document.getElementById("search").addEventListener("click", () => {
    let coin = document.getElementById("coin").value; // Get the coin name from the input
    if (coin) {
        fetchCoinData(coin); 
    } else {
        alert("Please enter a valid coin name.");
    }
});

// Function to fetch top cryptocurrencies
async function fetchTopCoins() {
    const apikey = "coinranking0fb39561cf7fe6c57dc82f34058ba281eff666bd7f084875"; // Your API key
    let url = `https://api.coinranking.com/v2/coins`; // API URL to get top cryptocurrencies

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': apikey 
            }
        });

        let data = await response.json(); // Parse the JSON response

        if (response.ok && data.data.coins.length > 0) {
            displayCoins(data.data.coins);
        } else {
            alert("Error fetching top coins.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching top coins.");
    }
}

// Function to fetch specific coin data
async function fetchCoinData(coin) {
    const apikey = "coinranking0fb39561cf7fe6c57dc82f34058ba281eff666bd7f084875"; // Your API key
    let url = `https://api.coinranking.com/v2/coins?search=${coin}`; // API URL to search for the coin

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': apikey 
            }
        });

        let data = await response.json(); // Parse the JSON response

        if (response.ok && data.data.coins.length > 0) {
            displayCoins(data.data.coins);
        } else {
            alert("Coin not found.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching the coin data.");
    }
}

// Function to display coins in the table
function displayCoins(coins) {
    let tbody = document.querySelector("#coin-table tbody");
    tbody.innerHTML = ""; // Clear the table

    coins.forEach(coinData => {
        let price = parseFloat(coinData.price).toFixed(2);
        let marketCap = parseFloat(coinData.marketCap).toFixed(2);
        let symbol = coinData.symbol;
        let coinLogo = coinData.iconUrl; 

        // Create a new row for each coin
        let row = document.createElement("tr");
        row.innerHTML += `
            <td><img src="${coinLogo}" alt="${coinData.name}"></td>
            <td><h3>${coinData.name} (${symbol})</h3></td>
            <td>$${price}</td>
            <td>$${marketCap}</td>
        `;
        tbody.appendChild(row);
    });
}
