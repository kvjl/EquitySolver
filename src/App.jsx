import React, { useState } from "react";
import "./App.css";
// import HomeFinder from "./HomeFinder";
import GeminiComponent from "./GeminiComponent";
import InterestVsPrincipalChart from "./InterestVsPrincipalChart";
import {
  calculateMonthlyPayment,
  generatePaymentSchedule,
  calculateLastPaymentDate,
} from "./MortgageCalculations";

function App() {
  const [homeValue, setHomeValue] = useState(258000);
  const [downPayment, setDownPayment] = useState(25800);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(2000);
  const [monthlyHOA, setMonthlyHOA] = useState(75);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [firstPaymentScheduledDate, setfirstPaymentScheduledDate] =
    useState("2024-08-19");
  const [lastPaymentScheduledDate, setlastPaymentScheduledDate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [calculated, setCalculated] = useState(false);

  const [extraMonthlyPayment, setextraMonthlyPayment] = useState(200);

  const handleHomeValueChange = (e) => {
    setHomeValue(e.target.value);
  };

  const formatHomeValue = () => {
    if (homeValue) {
      setHomeValue(parseFloat(homeValue).toFixed(2));
    }
  };

  const handleDownPaymentChange = (e) => {
    setDownPayment(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleLoanTermChange = (e) => {
    setLoanTerm(e.target.value);
  };

  const handlePropertyTaxChange = (e) => {
    setPropertyTax(e.target.value);
  };

  const handleMonthlyHOAChange = (e) => {
    setMonthlyHOA(e.target.value);
  };

  const handlefirstPaymentScheduledDatechange = (e) => {
    setfirstPaymentScheduledDate(e.target.value);
  };

  const handlelastPaymentScheduledDatechange = (e) => {
    setlastPaymentScheduledDate(e.target.value);
  };

  const handleExtraMonthlyPayment = (e) => {
    setextraMonthlyPayment(e.target.value);
  };

  const calculatePayments = () => {
    const principal = homeValue - downPayment;
    const numberOfPayments = loanTerm * 12;
    const monthlyPrincipalInterest = calculateMonthlyPayment(
      principal,
      interestRate,
      numberOfPayments
    );

    const monthlyTaxes = propertyTax / 12;
    const monthlyTotalPayment =
      monthlyPrincipalInterest + monthlyTaxes + parseFloat(monthlyHOA);
    setMonthlyPayment(monthlyTotalPayment.toFixed(2));

    const schedule = generatePaymentSchedule(
      principal,
      interestRate,
      monthlyPrincipalInterest,
      numberOfPayments,
      firstPaymentScheduledDate,
      extraMonthlyPayment
    );
    setPaymentSchedule(schedule);
    setCalculated(true);

    const newPrompt = `The Home value is ${homeValue}, the HOA is ${monthlyHOA}, the down payment is ${downPayment}`;
    setPrompt(newPrompt);

    const lastPaymentDate = calculateLastPaymentDate(
      firstPaymentScheduledDate,
      numberOfPayments
    );
    setlastPaymentScheduledDate(lastPaymentDate);

    console.log(schedule);
  };

  return (
    <div className="App">
      <h1>Equity Solver</h1>
      <div className="flex-container">
        <div className="left-side">
          <form className="container">
            <label>Home Value:</label>
            <input
              type="number"
              value={homeValue}
              onChange={handleHomeValueChange}
              onBlur={formatHomeValue}
              placeholder="Enter home value"
              step="0.01"
            />
            <label>Down Payment:</label>
            <input
              type="number"
              value={downPayment}
              onChange={handleDownPaymentChange}
              placeholder="Enter down payment"
            />
            <label>Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={handleInterestRateChange}
              placeholder="Enter interest rate"
              step="0.01"
            />
            <label>Loan Term (years):</label>
            <input
              type="number"
              required
              value={loanTerm}
              onChange={handleLoanTermChange}
              placeholder="Enter loan term"
            />
            <label>Property Tax (Yearly):</label>
            <input
              type="number"
              value={propertyTax}
              onChange={handlePropertyTaxChange}
              placeholder="Enter property tax"
            />
            <label>Monthly HOA ($):</label>
            <input
              type="number"
              value={monthlyHOA}
              onChange={handleMonthlyHOAChange}
              placeholder="Enter monthly HOA fee"
            />

            <label>Extra Monthly Payments ($):</label>
            <input
              type="number"
              value={extraMonthlyPayment}
              onChange={handleExtraMonthlyPayment}
              placeholder="Enter Monthly Extra payments on top of your mortgage"
            />

            <label>Date of First Payment:</label>
            <input
              type="date"
              value={firstPaymentScheduledDate}
              onChange={handlefirstPaymentScheduledDatechange}
            />
            <label>Date of Last Payment:</label>
            <input
              type="date"
              value={lastPaymentScheduledDate}
              onChange={handlelastPaymentScheduledDatechange}
            />

            <button type="button" onClick={calculatePayments}>
              Calculate
            </button>
            <div>
              <p>Monthly Payment: ${monthlyPayment}</p>
            </div>
          </form>
        </div>
        {calculated && (
          <InterestVsPrincipalChart
            calculated={calculated}
            paymentSchedule={paymentSchedule}
          />
        )}
      </div>
      <div className="ai-response">
        <GeminiComponent initialPrompt={prompt} />
      </div>
    </div>
  );
}

export default App;
