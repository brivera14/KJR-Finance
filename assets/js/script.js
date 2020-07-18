
// variables for stock fetch (JM)
let apiStockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
let apiKey = "&apikey=MYP2P4U87W95DBG6";
let stockInputEl = document.querySelector("#stacked-stockname");
let stockDateEl = document.querySelector("#stack-stockdate");
let stockFormEl = document.querySelector("#stock-form");

   
   // Get stock price api (JM)
   let getStockUrl = function(stock, stkdate) {
       console.log("api: ", stock, stkdate);
    let apiUrl = apiStockUrl + stock + apiKey;
    fetch(apiUrl).then(function(response) { 
        if (response.ok) {
            response.json().then(function(data) { 
                console.log(data);
                displayStock = data["Meta Data"]["2. Symbol"];
                let upperStock = displayStock.toUpperCase();
    
                let stockNameEl = document.querySelector('.stock-prices');
                let stknme = document.createElement('p');
                stockNameEl.appendChild(stknme);
                stknme.innerHTML = "Stock: " + upperStock;
                console.log(stkdate);
                
                // cannot grab stock prices (JM) ??????
                console.log(data["Time Series (Daily)"].stkdate[0]);
                console.log(data["Time Series (Daily)"].stkdate["1. open"]);
    
                //displayOpen = data["Time Series (Daily)"][0]["1. open"];
    
                //let stockOpenEl = document.querySelector('.stock-prices');
                //let stkopen = document.createElement('p');
                //stockOpenEl.appendChild(stkopen);
                //stkopen.innerHTML = "Open: " + displayOpen;
    
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("unable to connect");
    });
};

// Get stock name from input (JM)
let formSubmitHandler = function(event) {
    event.preventDefault();
    
    let stock = stockInputEl.value.trim();
    let stkdate = stockDateEl.value;
    console.log(stock, stkdate);
    if (stock) {
        getStockUrl(stock, stkdate);
        stockInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
};

// Call stock fetch (JM)
stockFormEl.addEventListener("submit", formSubmitHandler); 