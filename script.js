// Quando colocado async antes de uma função, isso indica que a função retornará uma Promise
// e permite o uso de await dentro dessa função para esperar por outras Promises.

async function updateQuote() {
    let fromCurrency = document.getElementById("from-currency").value;
    let toCurrency = document.getElementById("to-currency").value;
    let exchangeRate = document.getElementById("exchange-rate-info");

    if (fromCurrency === toCurrency) {
        exchangeRate.innerText = "As moedas selecionadas são iguais.";
        return;
    }

    let even = `${fromCurrency}-${toCurrency}`;
    console.log(even);

    try {
        let response = await fetch(`https://economia.awesomeapi.com.br/json/last/${even}`);
        let data = await response.json();
        let key = fromCurrency + toCurrency;
        // O valor da cotação (taxa de compra) de uma moeda para outra
        let rate = parseFloat(data[key].bid);

        exchangeRate.innerText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    } catch (error) {
        console.error("Erro ao buscar a cotação:", error);
        exchangeRate.innerText = "Erro ao buscar a cotação. Tente novamente mais tarde.";
    }
}

async function conversion() {
    let amount = parseFloat(document.getElementById("amount").value);
    console.log(amount);
    let fromCurrency = document.getElementById("from-currency").value;
    let toCurrency = document.getElementById("to-currency").value;  
    let result = document.getElementById("conversion-result");

    if (fromCurrency === toCurrency) {
        result.innerText = `${amount.toFixed(2)} ${fromCurrency} = ${amount.toFixed(2)} ${toCurrency}`;
        return;
    }

    if (isNaN(amount)) {
        result.innerText = "Por favor, insira um valor válido.";
        return;
    }

    let even = `${fromCurrency}-${toCurrency}`;
    console.log(even);

    try {
        let response = await fetch(`https://economia.awesomeapi.com.br/json/last/${even}`);
        let data = await response.json();
        let key = fromCurrency + toCurrency;
        // O valor da cotação (taxa de compra) de uma moeda para outra
        let rate = parseFloat(data[key].bid);
        let convertedAmount = (amount * rate).toFixed(2);

        result.innerText = `${amount.toFixed(2)} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

    } catch (error) {
        console.error("Erro ao buscar a cotação:", error);
        exchangeRate.innerText = "Erro ao buscar a cotação. Tente novamente mais tarde.";
    }

}

// Atualiza a cotação ao selecionar uma moeda
document.getElementById("from-currency").addEventListener("change", updateQuote);
document.getElementById("to-currency").addEventListener("change", updateQuote);

// Essencial para que a função seja chamada ao carregar a página
window.addEventListener("load", updateQuote);