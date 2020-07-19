// variables for stock fetch (JM)
let apiStockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
let apiKey = "&apikey=MYP2P4U87W95DBG6";
let stockInputEl = document.querySelector("#stockname");
let stockDateEl = document.querySelector("#stkdate");
let stockFormEl = document.querySelector("#stock-form");
let searchBtnEl = document.querySelector(".stock-history");

let stkHistoryArr = [];
let update = 0;


// variables for currencies (BR)
let usdEl = document.querySelector("#usd");
let audEl = document.querySelector("#aud");
let cadEl = document.querySelector("#cad");
let plnEl = document.querySelector("#pln");
let mxnEl = document.querySelector("#mxn");
   
   // Get stock price api (JM)
   let getStockUrl = function(stock, stkdate) {
    console.log("api: ", stock, stkdate);
    let apiUrl = apiStockUrl + stock + apiKey;
    fetch(apiUrl).then(function(response) { 
        if (response.ok) {
            response.json().then(function(data) {    
            console.log(data);
            saveSearchHistory(stock, stkdate);
            update = 1;
            getSearchHistory(update);
            update = 0;

            displayStock = data["Meta Data"]["2. Symbol"];
            let upperStock = displayStock.toUpperCase();

            let stockNameEl = document.querySelector('.stock-prices');
            let stknme = document.createElement('p');
            stockNameEl.appendChild(stknme);
            stknme.innerHTML = "Stock: " + upperStock + " Price Date: " + stkdate;
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
            stkopen.innerHTML = "Open: " + displayOpen;

            // Show stock high
            let stockHighEl = document.querySelector('.stock-prices');
            let stkhigh = document.createElement('p');
            stockHighEl.appendChild(stkhigh);
            stkhigh.innerHTML = "High: " + displayHigh;

            // Show stock low
            let stockLowEl = document.querySelector('.stock-prices');
            let stklow = document.createElement('p');
            stockLowEl.appendChild(stklow);
            stklow.innerHTML = "Low: " + displayLow;

            // Show closing stock price
            let stockCloseEl = document.querySelector('.stock-prices');
            let stkclose = document.createElement('p');
            stockCloseEl.appendChild(stkclose);
            stkclose.innerHTML = "Close: " + displayClose;

            // Show stock closing price
            let stockVolumeEl = document.querySelector('.stock-prices');
            let stkvolume = document.createElement('p');
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
    
    // fetch currency api to convert stock prices to different currencies (BR)
    let currencyApi = "http://api.currencylayer.com/live?access_key=18d5fcb4ab951492d7da46175fb934c4&currencies=USD,AUD,CAD,PLN,MXN&format=1%22";
    fetch(currencyApi).then(function(response2){
        if (response2.ok) {
            response2.json().then(function(data2) {
                console.log(data2);

                // get currencies values
                usdEl.textContent = data2["quotes"]["USDUSD"];
                audEl.textContent = data2["quotes"]["USDAUD"];
                cadEl.textContent = data2["quotes"]["USDCAD"];
                plnEl.textContent = data2["quotes"]["USDPLN"];
                mxnEl.textContent = data2["quotes"]["USDMXN"];
            });
        }
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

/* Get stock name from search history */
let formSubmitHistory = function(event) {
    event.preventDefault();

    let stock = event.target.innerHTML;
    if (stock) {
        for (var i = 0; i < stkHistoryArr.length; ++i) {
            if (stock === stkHistoryArr[i]) {
                console.log(i);
                let stkdate = stkHistoryArr[++i]
                console.log(stkHistoryArr[i]);
                console.log(i);
                console.log(stkdate);
                stockInputEl.value = "";
                getStockUrl(stock, stkdate);
            }
        }
    } else {
        alert("Please enter a Stock");
    }
};

// Load search history
let getSearchHistory = function(update) {
    if ("StockSearch" in localStorage) {
        let retrievedData = localStorage.getItem("StockSearch");
        stkHistoryArr = JSON.parse(retrievedData);
        if (update === 1) {
            let parent = document.querySelector('.stock-history');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            let priceparent = document.querySelector('.stock-prices');
            while (priceparent.firstChild) {
                priceparent.removeChild(priceparent.firstChild);
            }
        }
        let i =0;
        while (i < stkHistoryArr.length) {
            let loadstock = stkHistoryArr[i]
            let loadstockEl = document.querySelector('.stock-history');
            let stockInput = document.createElement('button');
            stockInput.classList.add('btn-hist');
            loadstockEl.appendChild(stockInput);
            stockInput.innerHTML = loadstock;
            i = i + 2;
        }
    } else {
        return;
    }
};

// Save search history
let saveSearchHistory = function(stock, stkdate) {
    if ("StockSearch" in localStorage) {
        let retrievedData = localStorage.getItem("StockSearch");
        stkHistoryArr = JSON.parse(retrievedData);

        let i =0;
        while (i < stkHistoryArr.length) {
            let stockUP = stock.toUpperCase();
            let arrUP = stkHistoryArr[i].toUpperCase();
            if (stockUP === arrUP) {
                return;
            } else {
                i++;
            }
        }
           
        if (stkHistoryArr.length <= 4) {
            stkHistoryArr.unshift(stock, stkdate);
            localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
        } else {
            stkHistoryArr.unshift(stock, stkdate);
            stkHistoryArr.pop(stock, stkdate);
            localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
        }
    } else {
        stkHistoryArr.push(stock, stkdate);
        localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
    }
};





// Call history, stock fetch, stock history (JM)
getSearchHistory();
stockFormEl.addEventListener("submit", formSubmitHandler); 
searchBtnEl.addEventListener("click", formSubmitHistory);