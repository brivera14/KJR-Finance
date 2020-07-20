
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

            let stockResponseEl = document.querySelector('.pure-table-bordered');
            

            let stockNameEl = document.querySelector('.pure-table-bordered');
            let stknme = document.createElement('th');
            stockNameEl.appendChild(stknme);
            stknme.innerHTML = "Stock: " + upperStock;
           // console.log(stkdate);
            
            // Grab stock prices (
            console.log(data["Time Series (Daily)"]["2020-07-17"]["1. open"]);
            console.log(data["Time Series (Daily)"]["2020-07-17"]["4. close"]);

            displayOpen = data["Time Series (Daily)"][stkdate]["1. open"];
            displayHigh = data["Time Series (Daily)"][stkdate]["2. high"];
            displayLow = data["Time Series (Daily)"][stkdate]["1. low"];
            displayClose = data["Time Series (Daily)"][stkdate]["4. close"];
            displayVolume = data["Time Series (Daily)"][stkdate]["5. volume"];
            
            // Show stock open price
            let stockOpenEl = document.querySelector('.pure-table-bordered');
            let stkopen = document.createElement('th');
            stockOpenEl.appendChild(stkopen);
            stkopen.innerHTML = "Open: " + displayOpen;

            // Show stock high
            let stockHighEl = document.querySelector('.pure-table-bordered');
            let stkhigh = document.createElement('th');
            stockHighEl.appendChild(stkhigh);
            stkhigh.innerHTML = "High: " + displayHigh;

            // Show stock low
            let stockLowEl = document.querySelector('.pure-table-bordered');
            let stklow = document.createElement('th');
            stockLowEl.appendChild(stklow);
            stklow.innerHTML = "Low: " + displayLow;

            // Show closing stock price
            let stockCloseEl = document.querySelector('.pure-table-bordered');
            let stkclose = document.createElement('th');
            stockCloseEl.appendChild(stkclose);
            stkclose.innerHTML = "Close: " + displayClose;

            // Show stock closing price
            let stockVolumeEl = document.querySelector('.pure-table-bordered');
            let stkvolume = document.createElement('th');
            stockVolumeEl.appendChild(stkvolume);
            stkvolume.innerHTML = "Volume: " + displayVolume;

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