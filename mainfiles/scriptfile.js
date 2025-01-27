// Fetch cryptocurrency data
fetch('https://api.coinranking.com/v2/coins')
    .then(response => response.json())
    .then(data => {
        const coins = data.data.coins;
        const coinTableBody = document.querySelector('#coin-table tbody');

        // Function to display coins in a table
        function displayCoins(coinsToDisplay) {
            coinTableBody.innerHTML = ''; // Clear the table
            coinsToDisplay.forEach(coin => {
                const row = document.createElement('tr');
                
                // Create table cells
                const logoCell = document.createElement('td');
                const nameCell = document.createElement('td');
                const symbolCell = document.createElement('td');
                const priceCell = document.createElement('td');
                const marketCapCell = document.createElement('td');
                const exchangePriceCell = document.createElement('td'); // Exchange price cell
                
                // Create an image element for logo
                const img = document.createElement('img');
                img.src = coin.iconUrl; // Assign the URL of the image here
                img.alt = `${coin.name} logo`; // Set alt text for accessibility
                logoCell.appendChild(img);

                // Convert price and market cap to a number before using toFixed
                const price = parseFloat(coin.price).toFixed(2);
                const marketCap = parseFloat(coin.marketCap).toFixed(2);

                // Assign content to the cells
                nameCell.textContent = coin.name;
                symbolCell.textContent = coin.symbol;
                priceCell.textContent = `$${price}`;
                marketCapCell.textContent = `$${marketCap}`;

                // Fetch the exchange price for the coin
                fetchExchangePrice(coin.symbol, exchangePriceCell);

                // Append cells to the row
                row.appendChild(logoCell);
                row.appendChild(nameCell);
                row.appendChild(symbolCell);
                row.appendChild(priceCell);
                row.appendChild(marketCapCell);
                row.appendChild(exchangePriceCell);

                // Add the row to the table body
                coinTableBody.appendChild(row);
            });
        }

        // Function to fetch exchange price (for demo, let's use Binance as an example)
        function fetchExchangePrice(symbol, exchangePriceCell) {
            // You may use a better API for real exchange prices like CoinGecko or Binance
            const exchangeApi = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
            
            fetch(exchangeApi)
                .then(response => response.json())
                .then(exchangeData => {
                    // Assuming the API returns data in this format:
                    const exchangePrice = exchangeData[symbol.toLowerCase()]?.usd;
                    if (exchangePrice) {
                        exchangePriceCell.textContent = `$${exchangePrice.toFixed(2)}`;
                    } else {
                        exchangePriceCell.textContent = 'N/A'; // If no price is available
                    }
                })
                .catch(err => {
                    console.error('Error fetching exchange price:', err);
                    exchangePriceCell.textContent = 'N/A';
                });
        }

        // Initially display all coins
        displayCoins(coins);

        // Add event listener for search input
        document.getElementById('search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase(); // Get search term in lowercase
            const filteredCoins = coins.filter(coin => 
                coin.name.toLowerCase().includes(searchTerm) || 
                coin.symbol.toLowerCase().includes(searchTerm)
            ); // Filter coins by name or symbol

            displayCoins(filteredCoins); // Display filtered coins
        });

        // Load Bitcoin price data for chart
        const bitcoin = coins.find(coin => coin.symbol === 'BTC');
        if (bitcoin) {
            const priceHistory = [/* Add price history data here */];
            drawBitcoinChart(priceHistory);
            drawOHLCChart(priceHistory);
        }
    })
    .catch(err => console.error(err));

