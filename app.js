const baseUrl = "https://api.fxratesapi.com";

let dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD")
            newOption.selected = "selected";
        if (select.name === "to" && currCode === "INR")
            newOption.selected = "selected";
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        upadateFlag(evt.target);
    })
}

const upadateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal.value === "" || amtVal < 1) {
        amtVal = 1
        amount.value = "1";
    }
    const URL = `${baseUrl}/convert?from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data["result"];
    let finalAmount = rate * amtVal;
    console.log(finalAmount);
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})