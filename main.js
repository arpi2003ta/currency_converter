console.log("Main.js working")

const populate = async (value, currency,targetcurrency) => {
    let myStr = "";
    const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_kLMu3xMUEGy97RtYHog2lRp2Zyfg2Wmg6MQwgNFv&base_currency" + currency ;
    try{
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let rJson = await response.json();
        console.log(rJson);
        document.querySelector(".output").style.display = "block";

        if (rJson["data"] && rJson["data"][targetcurrency]) {
            const rate = rJson["data"][targetcurrency]["value"];
            const convertedValue = Math.round(rate * value);
            myStr = ` <tr>
                        <td>${targetcurrency}</td>
                        <td>${rJson["data"][targetcurrency]["code"]}</td>
                        <td>${convertedValue}</td>
                    </tr>`;

            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = myStr;
        } else {
            console.error("Conversion data not available for the selected currencies.");
        }
    }
    catch (error) {
        console.error("Error fetching data: ", error);
    }

};
const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;
    const targetcurrency = document.querySelector("select[name='targetcurrency']").value;
    populate(value, currency,targetcurrency);
});