// variables for stock fetch (JM)
let apiStockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
let apiKey = "&apikey=MYP2P4U87W95DBG6";
let stockInputEl = document.querySelector("#stockname");
let stockDateEl = document.querySelector("#stkdate");
let stockFormEl = document.querySelector("#stock-form");

// variables for currencies (BR)
let usdEl = document.querySelector("#usd");
let eurEl = document.querySelector("#eur");
let jpyEl = document.querySelector("#jpy");
let gbpEl = document.querySelector("#gbp");
let cadEl = document.querySelector("#cad");
let chfEl = document.querySelector("#chf");
   
   // Get stock price api (JM)
   let getStockUrl = function(stock, stkdate) {
       console.log("api: ", stock, stkdate);
    let apiUrl = apiStockUrl + stock + apiKey;
    fetch(apiUrl).then(function(response) { 
        if (response.ok) {
            response.json().then(function(data) {    
            console.log(data);
            
            displayStock = data["Meta Data"]["2. Symbol"];
            displayStock.textContent = ""; // Created to remove last stock name (BR)
            let upperStock = displayStock.toUpperCase();

            let stockNameEl = document.querySelector('.stock-prices');
            stockNameEl.textContent = ""; // Created to remove last stock Prices (BR)
            let stknme = document.createElement('p');
            stockNameEl.appendChild(stknme);
            stknme.innerHTML = "Stock: " + upperStock;
           // console.log(stkdate);
            
            // Grab stock prices (
            console.log(data["Time Series (Daily)"]["2020-07-17"]["1. open"]);
            console.log(data["Time Series (Daily)"]["2020-07-17"]["4. close"]);

            displayOpen = data["Time Series (Daily)"][stkdate]["1. open"];
            displayHigh = data["Time Series (Daily)"][stkdate]["2. high"];
            // displayLow was givin value "UNDEFINED" because of a typo (BR)
            displayLow = data["Time Series (Daily)"][stkdate]["3. low"];
            displayClose = data["Time Series (Daily)"][stkdate]["4. close"];
            displayVolume = data["Time Series (Daily)"][stkdate]["5. volume"];
            
            // Show stock open price
            let stockOpenEl = document.querySelector('.stock-prices');
            let stkopen = document.createElement('p');
            stockOpenEl.appendChild(stkopen);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkopen.innerHTML = "Open: " + (Math.round(displayOpen)).toFixed(2);

            // Show stock high
            let stockHighEl = document.querySelector('.stock-prices');
            let stkhigh = document.createElement('p');
            stockHighEl.appendChild(stkhigh);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkhigh.innerHTML = "High: " + (Math.round(displayHigh)).toFixed(2);

            // Show stock low
            let stockLowEl = document.querySelector('.stock-prices');
            let stklow = document.createElement('p');
            stockLowEl.appendChild(stklow);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stklow.innerHTML = "Low: " + (Math.round(displayLow)).toFixed(2);

            // Show closing stock price
            let stockCloseEl = document.querySelector('.stock-prices');
            let stkclose = document.createElement('p');
            stockCloseEl.appendChild(stkclose);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkclose.innerHTML = "Close: " + (Math.round(displayClose)).toFixed(2);

            // Show stock closing price
            let stockVolumeEl = document.querySelector('.stock-prices');
            let stkvolume = document.createElement('p');
            stockVolumeEl.appendChild(stkvolume);
            stkvolume.innerHTML = "Volume: " + displayVolume;

            // fetch currency api to convert stock prices to different currencies (BR)
            let currencyApi = "http://api.currencylayer.com/live?access_key=18d5fcb4ab951492d7da46175fb934c4&currencies=USD,EUR,JPY,GBP,CAD,CHF&format=1%22";
            fetch(currencyApi).then(function(response2){
                if (response2.ok) {
                    response2.json().then(function(data2) {
                        console.log(data2);

                        // get currencies values
                        // applied method math.round with toFixed to reduce decimals in the value (BR)
                        usdEl.textContent = "American Dollar: " + (Math.round(displayClose * data2["quotes"]["USDUSD"])).toFixed(2);
                        eurEl.textContent = "Euro: " + (Math.round(displayClose * data2["quotes"]["USDEUR"])).toFixed(2);
                        jpyEl.textContent = "Yen: " + (Math.round(displayClose * data2["quotes"]["USDJPY"])).toFixed(2);
                        gbpEl.textContent = "Great British Pound: " + (Math.round(displayClose * data2["quotes"]["USDGBP"])).toFixed(2);
                        cadEl.textContent = "Canadian Dollar: " + (Math.round(displayClose * data2["quotes"]["USDCAD"])).toFixed(2);
                        chfEl.textContent = "Swiss Franc: " + (Math.round(displayClose * data2["quotes"]["USDCHF"])).toFixed(2);
                    });
                }
            });

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
        alert("Please enter a valid stock code");
    }
};

// Call stock fetch (JM)
stockFormEl.addEventListener("submit", formSubmitHandler); 