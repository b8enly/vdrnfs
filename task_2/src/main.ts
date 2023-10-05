import './app.css'
import App from './App.svelte'
import CurrencyConverter from './CurrencyConverter.svelte'

// const app = new App({
//   target: document.getElementById('app'),
// })

const currencyConverter = new CurrencyConverter({
  target: document.body,
});

export default currencyConverter
