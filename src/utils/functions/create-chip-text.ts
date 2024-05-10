export const DEFAULT_POINTS_SYMBOL = "￠"; 

const createChipText = (
  points: number,
  operation: string = "+",
  symbol: string = "￠"
) => {
  return `${operation}${points}${symbol}`;
};

export default createChipText;