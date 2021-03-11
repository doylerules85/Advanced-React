export default function formatMoney(amount = 0) {
  //   const newAmount = `$${(amount / 100).toFixed(2)}`;
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}
