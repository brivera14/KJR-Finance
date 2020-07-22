
// variables for stock fetch (JM)
let apiStockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
let apiKey = "&apikey=MYP2P4U87W95DBG6";
let stockInputEl = document.querySelector("#stacked-stockname");
let stockDateEl = document.querySelector("#stack-stockdate");
let stockFormEl = document.querySelector("#stock-form");
let searchBtnEl = document.querySelector(".stock-history");

let stkHistoryArr = [];
let update = 0;


// variables for currencies (BR)
let currencyList = document.querySelector("#currencies-list");
let currencyContEl = document.querySelector("#currency-container");
let usdOpenEl = document.querySelector("#usd-open");
let usdHighEl = document.querySelector("#usd-high");
let usdLowEl = document.querySelector("#usd-low");
let usdCloseEl = document.querySelector("#usd-close");
let eurOpenEl = document.querySelector("#eur-open");
let eurHighEl = document.querySelector("#eur-high");
let eurLowEl = document.querySelector("#eur-low");
let eurCloseEl = document.querySelector("#eur-close");
let jpyOpenEl = document.querySelector("#jpy-open");
let jpyHighEl = document.querySelector("#jpy-high");
let jpyLowEl = document.querySelector("#jpy-low");
let jpyCloseEl = document.querySelector("#jpy-close");
let gbpOpenEl = document.querySelector("#gbp-open");
let gbpHighEl = document.querySelector("#gbp-high");
let gbpLowEl = document.querySelector("#gbp-low");
let gbpCloseEl = document.querySelector("#gbp-close");
let cadOpenEl = document.querySelector("#cad-open");
let cadHighEl = document.querySelector("#cad-high");
let cadLowEl = document.querySelector("#cad-low");
let cadCloseEl = document.querySelector("#cad-close");
let chfOpenEl = document.querySelector("#chf-open");
let chfHighEl = document.querySelector("#chf-high");
let chfLowEl = document.querySelector("#chf-low");
let chfCloseEl = document.querySelector("#chf-close");
let userChosen = document.querySelector("#user-chosen");
let userOpenEl = document.querySelector("#user-open");
let userHighEl = document.querySelector("#user-high");
let userLowEl = document.querySelector("#user-low");
let userCloseEl = document.querySelector("#user-close");

// Get stock price api (JM)
let getStockUrl = function(stock, stkdate, currencyChosen) {
    console.log("api: ", stock, stkdate);
    let apiUrl = apiStockUrl + stock + apiKey;
    fetch(apiUrl).then(function(response) { 
        if (response.ok) {
            response.json().then(function(data) {    
            console.log(data);
            saveSearchHistory(stock);
            update = 1;
            getSearchHistory(update);
            update = 0;

            
            displayStock = data["Meta Data"]["2. Symbol"];
            displayStock.textContent = ""; // Created to remove last stock name (BR)
            let upperStock = displayStock.toUpperCase();

            let stockResponseEl = document.querySelector('.pure-table-bordered');
            

            let stockNameEl = document.querySelector('.pure-table-bordered');
            let stknme = document.createElement('th');
            stockNameEl.textContent = ""; // Created to remove last stock Prices (BR)
            let stknme1 = document.createElement('p');
            stknme.classList.add('stock-prices');
            stockNameEl.appendChild(stknme1);
            dispMM = stkdate.slice(5,7);
            dispDD = stkdate.slice(8,10);
            dispYYYY = stkdate.slice(0,4);
            dispStkDte = dispMM + "/" + dispDD + "/" + dispYYYY;
            stknme1.innerHTML = "Stock: " + upperStock + "  Price Date: " + dispStkDte;
                     
            // Grab stock prices (
            console.log(data["Time Series (Daily)"]["2020-07-17"]["1. open"]);
            console.log(data["Time Series (Daily)"]["2020-07-17"]["4. close"]);
            
            /* check for undefined (JM)
            if (typeof data["Time Series (Daily)"][stkdate]["1. open"] === "undefined") {
                console.log("ERROR - Display Modal")
            } */


            displayOpen = data["Time Series (Daily)"][stkdate]["1. open"];
            displayHigh = data["Time Series (Daily)"][stkdate]["2. high"];
            // displayLow was givin value "UNDEFINED" because of a typo (BR)
            displayLow = data["Time Series (Daily)"][stkdate]["3. low"];
            displayClose = data["Time Series (Daily)"][stkdate]["4. close"];
            displayVolume = data["Time Series (Daily)"][stkdate]["5. volume"];
            
            // Show stock open price
            let stockOpenEl = document.querySelector('.pure-table-bordered');
            let stkopen = document.createElement('th');
            stockOpenEl.appendChild(stkopen);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkopen.innerHTML = "Open: " + (Math.round(displayOpen)).toFixed(2);

            // Show stock high
            let stockHighEl = document.querySelector('.pure-table-bordered');
            let stkhigh = document.createElement('th');
            stockHighEl.appendChild(stkhigh);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkhigh.innerHTML = "High: " + (Math.round(displayHigh)).toFixed(2);

            // Show stock low
            let stockLowEl = document.querySelector('.pure-table-bordered');
            let stklow = document.createElement('th');
            stockLowEl.appendChild(stklow);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stklow.innerHTML = "Low: " + (Math.round(displayLow)).toFixed(2);

            // Show closing stock price
            let stockCloseEl = document.querySelector('.pure-table-bordered');
            let stkclose = document.createElement('th');
            stockCloseEl.appendChild(stkclose);
            // applied method math.round with toFixed to reduce decimals in the value (BR)
            stkclose.innerHTML = "Close: " + (Math.round(displayClose)).toFixed(2);

            // Show stock closing price
            let stockVolumeEl = document.querySelector('.pure-table-bordered');
            let stkvolume = document.createElement('th');
            stockVolumeEl.appendChild(stkvolume);
            stkvolume.innerHTML = "Volume: " + displayVolume;

                // fetch currency api to convert stock prices to different currencies (BR)
                let currencyApi = "http://api.currencylayer.com/live?access_key=18d5fcb4ab951492d7da46175fb934c4&currencies=USD,EUR,JPY,GBP,CAD,CHF&format=1%22";
                fetch(currencyApi).then(function(response2){
                    if (response2.ok) {
                        response2.json().then(function(data2) {
                            console.log(data2);

                            // applied method math.round with toFixed to reduce decimals in the value (BR)
                            
                            // USD Currency information
                            currencyContEl.style.display = "block";
                            usdOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDUSD"])).toFixed(2);
                            usdHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDUSD"])).toFixed(2);
                            usdLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDUSD"])).toFixed(2);
                            usdCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDUSD"])).toFixed(2);
                            
                            // EUR Currency information
                            eurOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDEUR"])).toFixed(2);
                            eurHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDEUR"])).toFixed(2);
                            eurLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDEUR"])).toFixed(2);
                            eurCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDEUR"])).toFixed(2);
                            
                            // JPY Currency information
                            jpyOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDJPY"])).toFixed(2);
                            jpyHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDJPY"])).toFixed(2);
                            jpyLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDJPY"])).toFixed(2);
                            jpyCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDJPY"])).toFixed(2);
                            
                            // GBP Currency information
                            gbpOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDGBP"])).toFixed(2);
                            gbpHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDGBP"])).toFixed(2);
                            gbpLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDGBP"])).toFixed(2);
                            gbpCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDGBP"])).toFixed(2);
                            
                            // CAD Currency information
                            cadOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDCAD"])).toFixed(2);
                            cadHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDCAD"])).toFixed(2);
                            cadLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDCAD"])).toFixed(2);
                            cadCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDCAD"])).toFixed(2);
                            
                            // CHF Currency information
                            chfOpenEl.textContent = "Open: " + (Math.round(displayOpen * data2["quotes"]["USDCHF"])).toFixed(2);
                            chfHighEl.textContent = "High: " + (Math.round(displayHigh * data2["quotes"]["USDCHF"])).toFixed(2);
                            chfLowEl.textContent = "Low: " + (Math.round(displayLow * data2["quotes"]["USDCHF"])).toFixed(2);
                            chfCloseEl.textContent = "Close: " + (Math.round(displayClose * data2["quotes"]["USDCHF"])).toFixed(2);
                        });
                    }
                });

                // get Currency chosen by user (BR)
                let currencyApi2 = "http://api.currencylayer.com/live?access_key=18d5fcb4ab951492d7da46175fb934c4&currencies=" + currencyChosen + "&format=1%22";

                fetch(currencyApi2).then(function(response3){
                    if (response3.ok) {
                        response3.json().then(function(data3) {
                            console.log(data3);

                            // display currency chosen by user
                            userChosen.textContent = currencyChosen + ":";
                            userOpenEl.textContent = "Open: " + (Math.round(displayOpen * data3["quotes"]["USD" + currencyChosen])).toFixed(2);
                            userHighEl.textContent = "High: " + (Math.round(displayHigh * data3["quotes"]["USD" + currencyChosen])).toFixed(2);
                            userLowEl.textContent = "Low: " + (Math.round(displayLow * data3["quotes"]["USD" + currencyChosen])).toFixed(2);
                            userCloseEl.textContent = "Close: " + (Math.round(displayClose * data3["quotes"]["USD" + currencyChosen])).toFixed(2);
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
    let currencyChosen = currencyList.value;
    let stkdate = stockDateEl.value;
    console.log(stock, stkdate);
    if (stock && currencyChosen) {
        getStockUrl(stock, stkdate, currencyChosen);
        stockInputEl.value = "";
        stockDateEl.value = "";
        currencyChosen = "";
    } else {
        alert("Please enter a valid stock code");
    }
};

/* Get stock name from search history */
let formSubmitHistory = function(event) {
    event.preventDefault();

    let stock = event.target.innerHTML;
    let currencyChosen = currencyList.value;
    if (stock) {
        stockInputEl.value = "";
        let today = new Date();
        let mm = ("0" + (today.getMonth() + 1)).slice(-2)
        let dd = ("0" + today.getDate()).slice(-2);
        let yyyy = today.getFullYear();
        console.log("before switch: ", mm, dd, yyyy);
        // New code to check if date valid
        switch (new Date().getDay()) {
            case 0:
              dd = dd - 2;
              break;
            case 1:
              dd = dd - 3;
              break;
            default:
              dd = dd - 1;
        }
        console.log("After switch: ", mm, dd, yyyy);

        displayDate = yyyy + "-" + mm + "-" + dd;
        console.log("Date: ", displayDate);
        stkdate = displayDate;
        console.log("stkdate: ", stkdate);
        getStockUrl(stock, stkdate, currencyChosen);
        stockInputEl.value = "";
        stockDateEl.value = "";
        currencyChosen = "";
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
            let priceparent = document.querySelector('.pure-table-bordered');
            while (priceparent.firstChild) {
                priceparent.removeChild(priceparent.firstChild);
            }
        }
        let i =0;
        let loadSearchEl = document.querySelector('.stock-history');
        let searchInput = document.createElement('p');
        searchInput.classList.add('stock-history-p');
        loadSearchEl.appendChild(searchInput);
        searchInput.innerHTML = "Search History: ";
        while (i < stkHistoryArr.length) {
            let loadstock = stkHistoryArr[i]
            let loadstockEl = document.querySelector('.stock-history');
            let stockInput = document.createElement('button');
            stockInput.classList.add('btn-hist');
            loadstockEl.appendChild(stockInput);
            stockInput.innerHTML = loadstock;
            i++;
        }
    } else {
        return;
    }
};

// Save search history
let saveSearchHistory = function(stock) {
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
           
        if (stkHistoryArr.length <= 6) {
            stkHistoryArr.unshift(stock);
            localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
        } else {
            stkHistoryArr.unshift(stock);
            stkHistoryArr.pop(stock);
            localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
        }
    } else {
        stkHistoryArr.push(stock);
        localStorage.setItem("StockSearch", JSON.stringify(stkHistoryArr));
    }
};

// create datepicker
$("#stkdate").datepicker({
    beforeShowDay: $.datepicker.noWeekends,
    dateFormat: 'yy-mm-dd',
    startDate: '2020-02-27',
    minDate: -145,
    maxDate: 0
});

// Call history, stock fetch, stock history (JM)
getSearchHistory();
stockFormEl.addEventListener("submit", formSubmitHandler); 
searchBtnEl.addEventListener("click", formSubmitHistory);