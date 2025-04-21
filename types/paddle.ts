export interface PaddlePrices {
  name: string;
  description: string;
  price_id: string;
  amount: string;
  currency: string;
  product_id: string;
}

export interface PaddleSubsctiption {
  subscription_id: string;
  next_billed_at: Date;
  cancellation_effective_at: Date;
  update_url: string;
  cancel_url: string;
}
