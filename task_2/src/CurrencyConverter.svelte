<script>
    import {onMount} from "svelte";

    let amount = 1;
    let fromCurrency = "USD";
    let toCurrency = "EUR";
    let exchangeRates = {};
    let euroAmount = 0;

    onMount(async () => {
        try {
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            const data = await response.json();
            exchangeRates = data.rates;
            convert();
        } catch (error) {
            console.error("Ошибка при выполнении", error);
        }
    });

    function convert() {
        const fromRate = exchangeRates[fromCurrency];
        const toRate = exchangeRates[toCurrency];
        const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);
        $: euroAmount = convertedAmount;
    }
</script>

<style>
    .converter {
        padding: 0 0 0 50px;
    }
    input {
        margin-right: 15px;
    }
    select {
        margin-right: 15px;
    }
</style>

<main>
    <div class="converter">
        <h1>Конвертер валют</h1>
        <label for="amountInput">Сумма: </label>
        <input
                type="number"
                id="amountInput"
                bind:value={amount}
                on:input={convert}
        />

        <label for="fromCurrencySelect">Валюта (для обмена):</label>
        <select
                id="fromCurrencySelect"
                bind:value={fromCurrency}
                on:change={convert}
        >
            {#each Object.keys(exchangeRates) as currency}
                <option value={currency}>{currency}</option>
            {/each}
        </select>

        <label for="toCurrencySelect">Валюта (получаемая):</label>
        <select
                id="toCurrencySelect"
                bind:value={toCurrency}
                on:change={convert}
        >
            {#each Object.keys(exchangeRates) as currency}
                <option value={currency}>{currency}</option>
            {/each}
        </select>

        <label for="result">Итоговая сумма: </label>
        <input type="text" id="result" bind:value={euroAmount} readonly/>
    </div>
</main>