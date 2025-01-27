// document.getElementById("search").addEventListener("click", () => {
    // let coin = document.getElementById("coin").value; // Get the coin name from the input
    // if (coin) {
    //     fetchdata(coin); 
    // } else {
    //     alert("coin not found enter valid coin name");
    // }
// });
let allcoinsdata=[]
async function fetchdata(coin) {
    const apikey = "coinranking0fb39561cf7fe6c57dc82f34058ba281eff666bd7f084875"; // Your API key
    let url = `https://api.coinranking.com/v2/coins?search=${coin}`; // API URL to search for the coin

    try {
        // Fetch with the API key in the headers
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': apikey 
            }
        });

        let data = await response.json(); // Parse the JSON response
        console.log(data);
        let tbody= document.getElementsByTagName("tbody");
        tbody.innerHTML = ""; 

        if (response.ok && data.data.coins.length > 0) {
            allcoinsdata=data.data.coins;
            displaycoins(allcoinsdata);
            // data.data.coins.forEach(coinData => { 
            //     let price = parseFloat(coinData.price).toFixed(2);
            //     let marketCap = parseFloat(coinData.marketCap).toFixed(2);
            //     let symbol = coinData.symbol;
            //     let coinlogo= coinData.iconUrl; 
            //     // let td=document.getElementsByTagName("td")
            //     // td[0].innerHTML+=`<img src="${coinlogo}" alt="${coinData.name}" style="width: 50px; height: 50px;"></img>`
            //     // td[1].innerHTML+=`<h3>${coinData.name}</h3>`
            //     // td[2].innerText+=`$${price}`;
            //     // td[3].innerText=`$${marketCap}`
            //     let row=document.createElement("tr")
            //     row.innerHTML += `
            //      <td><img src="${coinlogo}" alt="${coinData.name}" style="width: 50px; height: 50px;"></td>
            //      <td><h3>${coinData.name} (${symbol})</h3></td>
            //      <td>$${price}</td>
            //      <td>$${marketCap}</td>
            //     `;
            //     tbody[0].appendChild(row);
            //     let thead=document.getElementsByTagName("thead");
            //     thead[0].style.display="block";
                

            // });
          
           
            // alert("Coin data fetched successfully!");
            // displaycoins(coin)
        } else {
            console.error("Error:", data.message); 
            alert(data.message + " Error fetching data");
        }
    } catch (error) {
        // console.error("Fetch error:", error);
        alert("An error occurred while fetching data.");
    }
}
// let button=document.getElementById("search")
// button.addEventListener("click",()=>{
//     let coin= document.getElementById("coin").value;
//     if(coin){
//         displaycoins(coin)

//     }
//     else{
//         alert("enter a valid coin-name")
//     }
// })
// Search for a specific coin among the displayed data
// function searching(coinName) {
//     // Filter coins that match the search input (case insensitive)
//     let filtercoins = allcoinsdata.filter(coin => coin.name.toLowerCase().includes(coinName.toLowerCase()));
    
//     if (filtercoins.length > 0) {
//         displaycoins(filtercoins); // Display the filtered coins
//     } else {
//         alert("No coins found matching your search.");
//     }
// }
function displaycoins(coin){
    let tbody= document.getElementsByTagName("tbody");
    tbody[0].innerHTML = ""; 
    coin.forEach(coinData => { 
        let price = parseFloat(coinData.price).toFixed(2);
        let marketCap = parseFloat(coinData.marketCap).toFixed(2);
        let symbol = coinData.symbol;
        let coinlogo= coinData.iconUrl; 
        
        let row=document.createElement("tr")
        row.innerHTML += `
         <td><img src="${coinlogo}" alt"=${coinData.name}" style="width: 50px; height: 50px;"></td>
         <td><h3>${coinData.name} (${symbol})</h3></td>
         <td>$${price}</td>
         <td>$${marketCap}</td>
        `;
        tbody[0].appendChild(row);
        let thead=document.getElementsByTagName("thead");
        thead[0].style.display="block";
        tbody.appendChild(row)

    });
    function searching(coinName) {
        // Filter coins that match the search input (case insensitive)
        let filtercoins = allcoinsdata.filter(coin => coin.name.toLowerCase().includes(coinName.toLowerCase()));
        
        if (filtercoins.length > 0) {
            displaycoins(filtercoins); // Display the filtered coins
        } else {
            alert("No coins found matching your search.");
        }
    }
    
    // document.getElementById("search").addEventListener("click", () => {
    //     let coin = document.getElementById("coin").value; // Get the coin name from the input
    //     if (coin) {
    //         fetchdata(coin); 
    //     } else {
    //         alert("coin not found enter valid coin name");
    //     }
    // });

}
fetchdata("")
