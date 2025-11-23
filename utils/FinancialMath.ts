
export interface CalculationResult {
  futureValue: number;
  principal: number;
  totalInterest: number;
}

/**
 * Calculates the future value of an investment using the compound interest formula.
 * FV = P(1 + r/n)^(nt)
 * @param principal The initial amount of money (P).
 * @param annualRate The annual interest rate in percent (r).
 * @param years The number of years the money is invested for (t).
 * @param compoundsPerYear The number of times that interest is compounded per year (n).
 * @returns An object containing the future value, principal, and total interest earned.
 */
export const calculateCompoundInterest = (
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number
): CalculationResult => {
  // Convert annual rate from percentage to a decimal
  const rateDecimal = annualRate / 100;

  // Calculate the future value using the formula
  const futureValue =
    principal * Math.pow(1 + rateDecimal / compoundsPerYear, compoundsPerYear * years);

  // Calculate the total interest earned
  const totalInterest = futureValue - principal;

  return {
    futureValue,
    principal,
    totalInterest,
  };
};
