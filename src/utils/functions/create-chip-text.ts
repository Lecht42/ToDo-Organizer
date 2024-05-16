export const DEFAULT_POINTS_SYMBOL = "￠";

const createChipText = (points: number, operation: string = "+", symbol: string = DEFAULT_POINTS_SYMBOL) => {
  if (points <= 0) operation = " ";

  return `${operation}${points}${symbol}`;
};

export default createChipText;
