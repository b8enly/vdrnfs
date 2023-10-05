<script>
    import {onMount} from "svelte";

    let usdAmount = 1;
    let euroAmount = 0;
    let exchangeRate = 0;

    onMount(async () => {
        try {
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            const data = await response.json();
            exchangeRate = data.rates.EUR;
            convert();
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    });

    function convert() {
        euroAmount = (usdAmount * exchangeRate).toFixed(2);
    }
</script>

<style>

</style>

<main>
    <label for="usdInput">USD:</label>
    <input
            type="number"
            id="usdInput"
            bind:value={usdAmount}
            on:input={convert}
    />

    <label for="euroInput">EUR:</label>
    <input type="text" id="euroInput" bind:value={euroAmount} readonly/>
</main>