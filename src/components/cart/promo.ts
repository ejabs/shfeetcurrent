// promo.ts

interface Promo {
  code: string;
  discount: number; // Discount percentage
}

// List of available promo codes
export const promoCodes: Promo[] = [
  { code: "SAVE10", discount: 10 },
  // { code: "SAVE15", discount: 15 },
  // { code: "SAVE100", discount: 100 },
  // { code: "SAVE5", discount: 5 },
];

// Function to validate a promo code and return the discount
export function getPromoDiscount(code: string): number | null {
  const promo = promoCodes.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  );
  return promo ? promo.discount : null;
}
