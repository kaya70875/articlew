export interface PaddlePrices {
  name: string;
  description: string;
  price_id: string;
  amount: string;
  currency: string;
  product_id: string;
  limits: Limits;
}

export interface Limits {
  search: string;
  generate: string;
  grammar: string;
  fix: string;
  compare: string;
}

export interface PaddleSubsctiption {
  subscription_id: string;
  next_billed_at: Date | null;
  cancellation_effective_at: Date | null;
  update_url: string;
  cancel_url: string;
}
