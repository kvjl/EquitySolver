import React, { useState, useEffect } from "react";
import "./App.css";
import GeminiComponent from "./GeminiComponent";
// import HomeFinder from "./HomeFinder";
import InterestVsPrincipalChart from "./InterestVsPrincipalChart";
import {
  calculateMonthlyPayment,
  generatePaymentSchedule,
  calculateLastPaymentDate,
  generateExtraPaymentSchedule,
  calculateTotalInterest,
} from "./MortgageCalculations";

function App() {
  const [homeValue, setHomeValue] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [monthlyHOA, setMonthlyHOA] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [firstPaymentScheduledDate, setfirstPaymentScheduledDate] =
    useState("");
  const [lastPaymentScheduledDate, setlastPaymentScheduledDate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState(0);

  const [paymentScheduleExtraPayments, setPaymentScheduleExtraPayments] =
    useState([]);

  const [textInsights, setTextInsights] = useState("");

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
    setExtraMonthlyPayment(parseFloat(e.target.value) || 0);
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

    console.log("Extra Monthly Payment:", extraMonthlyPayment);
    console.log("First Payment Scheduled Date:", firstPaymentScheduledDate);

    const scheduleTraditional = generatePaymentSchedule(
      principal,
      interestRate,
      monthlyPrincipalInterest,
      numberOfPayments,
      firstPaymentScheduledDate
    );

    const scheduleExtraPayment = generateExtraPaymentSchedule(
      principal,
      interestRate,
      monthlyPrincipalInterest,
      numberOfPayments,
      firstPaymentScheduledDate,
      extraMonthlyPayment
    );

    setPaymentSchedule(scheduleTraditional);
    setPaymentScheduleExtraPayments(scheduleExtraPayment);

    setCalculated(true);

    const newPrompt = `The Home value is ${homeValue}, the HOA is ${monthlyHOA}, the down payment is ${downPayment}`;
    setPrompt(newPrompt);

    const lastPaymentDate = calculateLastPaymentDate(
      firstPaymentScheduledDate,
      numberOfPayments
    );
    setlastPaymentScheduledDate(lastPaymentDate);

    const totalInterestTraditional =
      calculateTotalInterest(scheduleTraditional);

    const totalInterestExtra = calculateTotalInterest(scheduleExtraPayment);
    const savings = totalInterestTraditional - totalInterestExtra;

    setTextInsights(
      `If you add an additional $${extraMonthlyPayment.toLocaleString()}, you can save a total of $${savings.toLocaleString()} in interest`
    );

    console.log(scheduleTraditional);
    console.log(scheduleExtraPayment);
  };

  return (
    <div className="App">
      <h1>Equity Solver</h1>
      {/* <HomeFinder /> */}
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
              placeholder="Enter the additional payments."
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
            paymentScheduleExtraPayments={paymentScheduleExtraPayments}
          />
        )}
      </div>
      {calculated && (
        <div id="smart-insights-section">
          <h3 className="smart-insights-content">Smart Insights:</h3>
          <ul className="smart-insights-content">
            <li>{textInsights}</li>
          </ul>
        </div>
      )}

      {/* <div className="ai-response">
        <GeminiComponent initialPrompt={prompt} />
      </div> */}
    </div>
  );
}

export default App;
