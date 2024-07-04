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
  firstPaymentDate,
  extraMonthlyPayment
) => {
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;
  let principalPaid = principal;
  let cumulativePrincipalExtraPayments = 0;

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

    cumulativePrincipalExtraPayments += principalPayment + extraMonthlyPayment;

    return {
      name: `Year ${Math.floor(month / 12) + 1}`,
      cumulativePrincipal: cumulativePrincipal.toFixed(2),
      interest: interestPayment.toFixed(2),
      cumulativeInterest: cumulativeInterest.toFixed(2),
      cumulativePrincipalExtraPayments:
        cumulativePrincipalExtraPayments.toFixed(2),
      scheduledDate: currentDate.toISOString().split("T")[0],
    };
  });
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
