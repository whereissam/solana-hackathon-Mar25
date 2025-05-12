export const impactData = [
  {
    amount: 10,
    description: "Provides clean water for 20 people for a month",
  },
  {
    amount: 25,
    description: "Supplies educational materials for 5 students",
  },
  { amount: 50, description: "Funds emergency medical care for 2 patients" },
  { amount: 100, description: "Plants 100 trees to restore forest habitats" },
  {
    amount: 250,
    description: "Delivers food packages to 25 families in need",
  },
  {
    amount: 500,
    description: "Builds a clean water well for an entire village",
  },
];

export const getImpactForAmount = (amount: number | string) => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  // Find the closest impact data point
  const sortedImpacts = [...impactData].sort(
    (a, b) => Math.abs(a.amount - numAmount) - Math.abs(b.amount - numAmount),
  );
  return (
    sortedImpacts[0]?.description ||
    "Makes a meaningful difference to those in need"
  );
};