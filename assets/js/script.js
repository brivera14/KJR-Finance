// variables for stock fetch (JM)
let apiStockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
let apiKey = "&apikey=MYP2P4U87W95DBG6";
let stockInputEl = document.querySelector("#stockname");
let stockDateEl = document.querySelector("#stkdate");
let stockFormEl = document.querySelector("#stock-form");

   
   // Get stock price api (JM)
   let getStockUrl = function(stock, stkdate) {
       console.log("api: ", stock, stkdate);
    let apiUrl = apiStockUrl + stock + apiKey;
    fetch(apiUrl).then(function(response) { 
        if (response.ok) {
            response.json().then(function(data) {    
                console.log(data);
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