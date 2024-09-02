export interface PizzaSize {
  name: string;
  price: number;
}

export interface Topping {
  name: string;
  price: number;
  type: 'veg' | 'non-veg';
}

export interface Offer {
  condition: (size: PizzaSize | undefined, toppings: Topping[]) => boolean;
  description: string;
  price: number;
}