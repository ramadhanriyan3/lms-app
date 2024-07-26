export const formatCurrency = (number: number) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return currency.format(number);
};
