import { PizzaSize, Topping, Offer } from './models/pizza.model';

export const PIZZA_SIZES: PizzaSize[] = [
  { name: 'Small', price: 5 },
  { name: 'Medium', price: 7 },
  { name: 'Large', price: 8 },
  { name: 'Extra Large', price: 9 }
];

export const TOPPINGS: Topping[] = [
  { name: 'Tomatoes', price: 1, type: 'veg' },
  { name: 'Onions', price: 0.5, type: 'veg' },
  { name: 'Bell peppers', price: 1, type: 'veg' },
  { name: 'Mushrooms', price: 1.2, type: 'veg' },
  { name: 'Pineapple', price: 0.75, type: 'veg' },
  { name: 'Sausage', price: 1, type: 'non-veg' },
  { name: 'Pepperoni', price: 2, type: 'non-veg' },
  { name: 'Barbeque Chicken', price: 3, type: 'non-veg' }
];

export const OFFERS: Offer[] = [
  {
    description: '1 Medium pizza with 2 toppings = $5',
    condition: (size, toppings) => size.name === 'Medium' && toppings.length === 2,
    price: 5
  },
  {
    description: '1 Medium pizza with 4 toppings = $9',
    condition: (size, toppings) => size.name === 'Medium' && toppings.length === 4,
    price: 9
  },
  {
    description: '1 Large pizza with 4 toppings (Pepperoni and barbeque chicken are counted as 2 toppings) = 50% discount',
    condition: (size, toppings) => size.name === 'Large' && new Set(toppings.map(t => t.name)).size <= 4 && 
      (toppings.includes(TOPPINGS.find(t => t.name === 'Pepperoni')!) || 
      toppings.includes(TOPPINGS.find(t => t.name === 'Barbeque Chicken')!)),
    price: size.price * 0.5
  }
];
