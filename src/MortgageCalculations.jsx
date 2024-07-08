// mortgageCalculations.js
export const calculateMonthlyPayment = (
  principal,
  interestRate,
  numberOfPayments
) => {
  let monthlyInterestRate = interestRate / 100 / 12;
  return (
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
  );
};

export const generatePaymentSchedule = (
  principal,
  interestRate,
  monthlyPrincipalInterest,
  numberOfPayments,
  firstPaymentDate
) => {
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let principalPaid = principal;

  const firstDate = new Date(firstPaymentDate);
  firstDate.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: numberOfPayments }, (_, month) => {
    const currentDate = new Date(firstDate);
    currentDate.setUTCMonth(currentDate.getUTCMonth() + month);

    const interestPayment = principalPaid * (interestRate / 100 / 12);
    const principalPayment = monthlyPrincipalInterest - interestPayment;

    cumulativeInterest += interestPayment;
    cumulativePrincipal += principalPayment;
    principalPaid -= principalPayment;
    const year = Math.floor(month / 12) + 1;
    const fiveYearIncrement = year;

    return {
      cumulativePrincipal: cumulativePrincipal.toFixed(2),
      interest: interestPayment.toFixed(2),
      cumulativeInterest: cumulativeInterest.toFixed(2),

      scheduledDate: currentDate.toISOString().split("T")[0],
      year: `Year ${Math.floor(month / 12) + 1}`,
      fiveYearIncrement: `Year ${fiveYearIncrement}`,
    };
  });
};

export const generateExtraPaymentSchedule = (
  principal,
  interestRate,
  monthlyPrincipalInterest,
  numberOfPayments,
  firstPaymentDate,
  extraMonthlyPayment
) => {
  let remainingPrincipal = principal;
  let cumulativeInterestExtraPayments = 0;
  let cumulativePrincipalExtraPayments = 0;
  const schedule = [];
  const firstDate = new Date(firstPaymentDate);
  firstDate.setUTCHours(0, 0, 0, 0);

  for (let month = 0; month < numberOfPayments; month++) {
    const currentDate = new Date(firstDate);
    currentDate.setUTCMonth(currentDate.getUTCMonth() + month);

    const interestPayment = remainingPrincipal * (interestRate / 100 / 12);
    let principalPayment =
      monthlyPrincipalInterest - interestPayment + extraMonthlyPayment;

    if (principalPayment > remainingPrincipal) {
      principalPayment = remainingPrincipal;
      // Loan is paid off this month
    }

    console.log(extraMonthlyPayment);

    cumulativeInterestExtraPayments += interestPayment;
    cumulativePrincipalExtraPayments += principalPayment;
    remainingPrincipal -= principalPayment;
    const year = Math.floor(month / 12) + 1;
    const fiveYearIncrement = year;

    schedule.push({
      cumulativePrincipalExtra: cumulativePrincipalExtraPayments.toFixed(2),
      interest: interestPayment.toFixed(2),
      cumulativeInterestExtra: cumulativeInterestExtraPayments.toFixed(2),
      scheduledDate: currentDate.toISOString().split("T")[0],
      year: `Year ${Math.floor(month / 12) + 1}`,
      fiveYearIncrement: `Year ${fiveYearIncrement}`,
    });

    if (remainingPrincipal <= 0) {
      break; // Stop the loop since the loan is paid off
    }
  }

  return schedule;
};

export const calculateLastPaymentDate = (
  firstPaymentDate,
  numberOfPayments
) => {
  const lastPaymentDate = new Date(firstPaymentDate);
  lastPaymentDate.setUTCHours(0, 0, 0, 0);
  lastPaymentDate.setUTCMonth(
    lastPaymentDate.getUTCMonth() + numberOfPayments - 1
  );
  return lastPaymentDate.toISOString().split("T")[0];
};

//sums the total interest of the payment schedule array, you can plug in the traditional or the one with extra payments
export const calculateTotalInterest = (paymentSchedule) => {
  return paymentSchedule.reduce((total, payment) => {
    return total + parseFloat(payment.interest);
  }, 0);
};
