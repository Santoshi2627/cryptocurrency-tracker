// let allcoinsdata = [];

// // Fetch data from the API
// async function fetchdata(coin="") {
//     let url = `https://api.coinranking.com/v2/coins?search=${coin}`; 

//     try {
//         let response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application-json'
//             }
//         });

//         let data = await response.json(); // Parse the JSON response

//         if (response.ok && data.data.coins.length > 0) {
//             allcoinsdata = data.data.coins; 
//             displaycoins(allcoinsdata); 
//         } else {
//             console.error("Error:", data.message); 
//             alert(data.message + " Error fetching data");
//         }
//     } catch (error) {
//         alert("An error occurred while fetching data.");
//     }
// }

// // Displaying the coins in the table
// function displaycoins(coins) {
//     let tbody = document.getElementsByTagName("tbody")[0];
//     tbody.innerHTML = "";

//     coins.forEach(coin => {
//         let price = parseFloat(coin.price).toFixed(2);
//         let marketCap = parseFloat(coin.marketCap).toFixed(2);
//         let symbol = coin.symbol;
//         let coinlogo = coin.iconUrl;
//          let volum=coin["24hVolume"]//beacause "24hVolume" has a number at the beginning and includes a special character (the letter "h"). This is why you must use bracket notation instead of dot notation.

//         // Create a new row for each coin
//         let row = document.createElement("tr");
//         row.innerHTML = `
//             <td><img src="${coinlogo}" alt="${coin.name}" style="width: 50px; height: 50px;"></td>
//             <td><h5>${coin.name}</h5></td>
//             <td>${symbol}</td>
//             <td>$${price}</td>
//             <td>$${marketCap}</td>
//             <td>$${volum}</td>
//         `;

//         // Append the row to the table body
//         tbody.appendChild(row);
//     });

//     // let thead = document.getElementsByTagName("thead")[0];
//     // thead.style.display = "block"; 
// }
// // function showCoinDetails(coin) {
// // let coinname=document.getElementById("coinname");
// // let logo=document.getElementById("logo");
// // let symbol=document.getElementById("symbol");
// // let details=document.getElementById("desc");
// // coinname.innerText=`${coin.name}`
// // logo.innerText=`${coinlogo}`
// // symbol.innerText=`${symbol}`
// // details.innerText=`${}`
// // }
// // Search for a specific coin among the displayed data
// function searching() {
//     let coinname= document.getElementById("coin").value
//     // Filter coins that match the search input (case insensitive)
//     let filtercoins = allcoinsdata.filter(coin => coin.name.toLowerCase().includes(coinname.toLowerCase()));

//     if (filtercoins.length > 0) {
//         displaycoins(filtercoins); // displaying the filtered coins
//     } else {
//         alert("please enter a valid coin name.");
//     }
// }
// // getting description of each coin when i click that particular row
// async function fetchcoindescription(coinUuid) {
//     const url = `https://api.coinranking.com/v2/coins?search=${coin}${coinUuid}`;
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         let div=document.getElementById("coin-details")
//         div.style.display="block";

//         if (response.ok && result.data && result.data.coin) {
//             const coin = result.data.coin;
//             let coinname=document.getElementById("coinname");
//              coinname.innerText=`${coin.name}`
//              let details=document.getElementById("desc");
//              details.innerText=`${coin.description}`
            
//         } else {
//             alert('Error:', result.message);
//         }
//     } catch (error) {
//         alert('Error fetching coin description:', error);
//     }
// }
// row.addEventlistener("click",()=>{
//     fetchcoindescription(coinUuid);

// })

// fetchdata(" "); // Passing an empty string to fetch all coins
let allcoinsdata = [];

// Fetch data from the API
async function fetchdata(coin="") {
    let url = `https://api.coinranking.com/v2/coins?search=${coin}`; 

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
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
        let coinlogo = coin.iconUrl;
        let volum = coin["24hVolume"]; // Bracket notation is correct for special characters
        let rank= coin.rank

        // Create a new row for each coin
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${rank}</td>
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
             // Pass the coin UUID
        });
    });
}

// Search for a specific coin among the displayed data
function searching() {
    let coinname = document.getElementById("coin").value;
    let filtercoins = allcoinsdata.filter(coin => 
        coin.name.toLowerCase().includes(coinname.toLowerCase())
    );

    if (filtercoins.length > 0) {
        // showCoinDescription(coinName);
        displaycoins(filtercoins); // Display the filtered coins
    } else {
        alert("Please enter a valid coin name.");
    }
}

// function searching() {
//     let coinname = document.getElementById("coin").value.trim();

//     if (!coinname) {
//         alert("Please enter a coin name.");
//         return;
//     }

//     let filtercoins = allcoinsdata.filter(coin =>
//         coin.name.toLowerCase().includes(coinname.toLowerCase())
//     );

//     if (filtercoins.length > 0) {
//         displaycoins(filtercoins); // Display the filtered coins
//     } else {
//         alert("No matching coins found. Please enter a valid coin name.");
//     }
// }
// Fetch coin description by coin UUID
// async function fetchcoindescription(coinUuid) {
//     const url = `https://api.coinranking.com/v2/coin/${coinUuid}`; // Corrected the URL

//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json'
//             }
//         });

//         const result = await response.json();
//         let div = document.getElementById("coin-details");
//         div.style.display = "block";

//         if (response.ok && result.data && result.data.coin) {
//             const coin = result.data.coin;
//             let coinname = document.getElementById("coinname");
//             coinname.innerText = `${coin.name}`;
//             let details = document.getElementById("desc");
//             details.innerText = `${coin.description}`;
//         } else {
//             alert('Error:', result.message);
//         }
//     } catch (error) {
//         alert('Error fetching coin description:', error);
//     }
// }
// Assuming you have an element to display the description
// let coinDescription = {
//     "bitcoin": "Bitcoin is the first decentralized digital currency, created in 2009 by an anonymous entity known as Satoshi Nakamoto. It enables peer-to-peer transactions over the internet without a central authority or bank. Bitcoin's limited supply (21 million coins) and strong security features have made it a popular choice for investment and a hedge against inflation.",
//     "ethereum": "Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (DApps). Launched in 2015, Ethereum's native cryptocurrency, Ether, is used to facilitate transactions on the network. Ethereum aims to create a more open and accessible internet through blockchain technology.",
//     // Add similar descriptions for other coins
// };

// // Example of displaying the description
// function showCoinDescription(coinName) {
//     let description = coinDescription[coinName.toLowerCase()] || "Description not available.";
//     document.getElementById("desc").innerText = description; // Display in your details section
// }



fetchdata(""); // Fetch all coins by passing an empty string
// routing the homepage in bitcoins page
// let gohome=document.getElementById("home")
// gohome.addEventListener("click",()=>{
//     window.location.assign("./homepage.html")
// });
function gotohomepage(){
    window.location.assign("./homepage.html")
}
