export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);
