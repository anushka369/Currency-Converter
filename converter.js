const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let final = document.querySelector(".final");
const dropdowns = document.querySelectorAll(".dropdown select");

for(let code in countryList)
{
    console.log(code , countryList[code]);
}

for(let select of dropdowns)
{
    for(let currencycode in countryList)
    {
        let newopt = document.createElement("option");
        newopt.innerText = currencycode;
        newopt.value = currencycode;

        if (select.name === "from" && currencycode === "USD")
        {
            newopt.selected = "selected";
        }
        
        else if (select.name==="to" && currencycode==="INR")
        {
            newopt.selected = "selected";
        }
            
        select.append(newopt);
        select.addEventListener("change",(evt)=>{update(evt.target);});
    }
}

const update = (element) =>
{
    let currencycode = element.value;
    console.log(currencycode);
    let countrycode = countryList[currencycode];
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", (evt) =>
{
    evt.preventDefault();
    updateRate();
});

const updateRate= async() =>
{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval === "" || amtval < 1)
    {
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL} / ${fromcurr.value.toLowerCase()}.json`;
    
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);      
    let finalamt = amtval * rate;
    final.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}

window.addEventListener("load",() =>
{
  updateRate();
});
