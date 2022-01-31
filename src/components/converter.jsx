import React, { Component } from "react";

class ConverterBox extends Component {
  state = {
    currencies: ["EUR", "USD", "AUD", "ZAR", "GBP"],
    base: "",
    amount: "",
    convertTo: "",
    result: "",
    date: "",
  };

  handleInput = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /* Currency Calculator */
  calculate = (e) => {
    const amount = this.state.amount;
    e.preventDefault();
    if (amount === isNaN) {
      return "error";
    } else {
      // Api fetch method
      fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=264ac0ca9f515b27d18ccbaada3d26d6&base=${this.state.base}`
      )
        .then((res) => res.json())
        .then((data) => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date,
          });
        });
    }
  };

  /* Switch button method to switch currencies */
  handleSwitch = (e) => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState({
      base: convertTo,
      convertTo: base,
    });
  };

  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <section className="pt-14 align-center bg-white pb-14 px-6 shadow-lg border-2 rounded-lg border-blue-100">
        <h1 className="text-black text-3xl mb-10 font-semibold">
          Currency Converter
        </h1>

        {/* Converter form elements*/}
        <form>
          <div className="flex flex-row mb-6 gap-9 items-end">
            {/* Amount element */}
            <div className="flex-1">
              <label className="font-bold text-md mb-3 block" htmlFor="text">
                Amount
              </label>
              <input
                type="number"
                className="focus:outline-none focus:ring-1 focus:ring-green-100 focus:border-green-300 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2"
                value={amount}
                onChange={this.handleInput}
                size="lg"
                placeholder="Enter amount"
              />
            </div>
            {/* Base currency element */}
            <select
              className="flex-0.5 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 border-2 border-green-300 rounded-xl text-xl pl-2 pr-3 py-2"
              name="base"
              value={base}
              onChange={this.handleSelect}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            {/* Switch button */}
            <button
              className="h-5px w-5px rounded-full"
              onClick={this.handleSwitch}
            >
              <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/40/000000/external-switch-arrow-flatart-icons-flat-flatarticons-1.png" />
            </button>

            {/* Convert to element */}
            <select
              type="option"
              className="flex-0.5 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 border-2 border-green-300 rounded-xl text-xl pl-2 pr-3 py-2"
              name="convertTo"
              value={convertTo}
              onChange={this.handleSelect}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Result Data */}
          <div className="flex justify-between mt-10  items-center">
            <>
              <div>
                <div className="flex gap-1 mb-1">
                  <p className="font-semibold text-md text-gray-500">
                    {amount} {base}
                  </p>
                </div>
                <div className="flex gap-1 font-normal items-baseline">
                  <p className="text-5xl font-bold">
                    {result} {convertTo}
                  </p>
                </div>
                <p className="font-medium pt-2 text-md text-gray-600">
                  As of {date}
                </p>
                <p className="flex items-center text-xs pt-7 font-regular text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  &nbsp; This conversion uses midmarket rates.
                </p>
              </div>
            </>

            <div>
              {/* Convert Button */}
              <button
                className="inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-blue-500 hover:bg-blue-700"
                onClick={this.calculate}
              >
                Convert
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default ConverterBox;
