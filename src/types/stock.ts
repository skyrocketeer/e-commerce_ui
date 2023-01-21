export interface IStockData {
  id: number;
  symbol: string;
  costPrice: number;
  targetPrice: number;
  amount: number;
  status: number;
  purchaseDate: string;
}

export interface UpdateStockDto {
  symbol: string;
  costPrice: number;
  targetPrice: number;
  amount: number;
  status: number;
  purchaseDate: string;
}
