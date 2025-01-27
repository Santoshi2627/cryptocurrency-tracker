// Fetch data from the API
async function fetchdata(coin = "") {
    let url = `https://api.coinranking.com/v2/coins?search=${coin}`;

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Fixed typo here
            }
        });

        let data = await response.json(); // Parse the JSON response

        if (response.ok && data.data.coins.length > 0) {
            allcoinsdata = data.data.coins; 
            displaycoins(allcoinsdata); 
        } else {
            console.error("Error:", data.message); 
            alert(data.message + " Error fetching data");
        }
    } catch (error) {
        alert("An error occurred while fetching data.");
    }
}

// Displaying the coins in the table
function displaycoins(coins) {
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    coins.forEach(coin => {
        let price = parseFloat(coin.price).toFixed(2);
        let marketCap = parseFloat(coin.marketCap).toFixed(2);
        let symbol = coin.symbol;
        let coinlogo = coin.iconUrl; // This should be a valid URL
        let volum = coin["24hVolume"]; 

        // Create a new row for each coin
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${coinlogo}" alt="${coin.name}" style="width: 50px; height: 50px;"></td>
            <td><h5>${coin.name}</h5></td>
            <td>${symbol}</td>
            <td>$${price}</td>
            <td>$${marketCap}</td>
            <td>$${volum}</td>
        `;

        // Append the row to the table body
        tbody.appendChild(row);

        // Add event listener to row to fetch coin description on click
        row.addEventListener("click", () => {
            fetchcoindescription(coin.uuid); // Pass the coin UUID for fetching description
        });
    });
}

// Fetch coin description by coin UUID
async function fetchcoindescription(coinUuid) {
    const url = `https://api.coinranking.com/v2/coin/${coinUuid}`; // Correct URL for coin description

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        let div = document.getElementById("coin-details");
        div.style.display = "block";

        if (response.ok && result.data && result.data.coin) {
            const coin = result.data.coin;
            let coinname = document.getElementById("coinname");
            coinname.innerText = `${coin.name}`;
            let details = document.getElementById("desc");
            details.innerText = `${coin.description}`;
        } else {
            alert('Error:', result.message);
        }
    } catch (error) {
        alert('Error fetching coin description:', error);
    }
}

// Function to search for coins
function searching() {
    let coinname = document.getElementById("coin").value;
    let filtercoins = allcoinsdata.filter(coin => 
        coin.name.toLowerCase().includes(coinname.toLowerCase())
    );

    if (filtercoins.length > 0) {
        displaycoins(filtercoins); // Display the filtered coins
    } else {
        alert("Please enter a valid coin name.");
    }
}

// Fetch all coins by passing an empty string
fetchdata(""); 
