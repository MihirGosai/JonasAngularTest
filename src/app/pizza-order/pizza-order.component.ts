// src/app/pizza-order/pizza-order.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaSize, Topping } from '../models/pizza.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Import CommonModule to use CurrencyPipe
})

export class PizzaOrderComponent {

  pizzaSizes: PizzaSize[] = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 }
  ];

  toppings: Topping[] = [
    { name: 'Tomatoes', price: 1.00, type: 'veg' },
    { name: 'Onions', price: 0.5, type: 'veg' },
    { name: 'Bell peppers', price: 1.00, type: 'veg' },
    { name: 'Mushrooms', price: 1.20, type: 'veg' },
    { name: 'Pineapple', price: 0.75, type: 'veg' },
    { name: 'Sausage', price: 1.00, type: 'non-veg' },
    { name: 'Pepperoni', price: 2.00, type: 'non-veg' },
    { name: 'Barbeque Chicken', price: 3.00, type: 'non-veg' }
  ];

  selectedSmallSizeToppings: Topping[] = [];
  selectedMediumSizeToppings: Topping[] = [];
  selectedLargeSizeToppings: Topping[] = [];
  selectedXLargeSizeToppings: Topping[] = [];

  selectedSize: PizzaSize | null = null;
  smallSizeAppliedOffer: string = "";
  mediumSizeAppliedOffer: string = "";
  largeSizeAppliedOffer: string = "";
  xLargeSizeAppliedOffer: string = "";

  totalSmallSizePrice: number = 0;
  totalMediumSizePrice: number = 0;
  totalLargeSizePrice: number = 0;
  totalXLargeSizePrice: number = 0;

  totalSmallSizePriceWithoutOffer: number = 0;
  totalMediumSizePriceWithoutOffer: number = 0;
  totalLargeSizePriceWithoutOffer: number = 0;
  totalXLargeSizePriceWithoutOffer: number = 0;


  get vegToppings(): Topping[] {
    return this.toppings.filter(topping => topping.type === 'veg');
  }

  get nonVegToppings(): Topping[] {
    return this.toppings.filter(topping => topping.type === 'non-veg');
  }

  toggleSmallSizeTopping(topping: Topping): void {
    if (this.selectedSmallSizeToppings.includes(topping)) {
      this.selectedSmallSizeToppings = this.selectedSmallSizeToppings.filter(x=>x.name != topping.name);
    } else {
      this.selectedSmallSizeToppings.push(topping);
    }

    this.calculateSmallSizePrice();
  }

  toggleMediumSizeTopping(topping: Topping): void {
    if (this.selectedMediumSizeToppings.includes(topping)) {
      this.selectedMediumSizeToppings = this.selectedMediumSizeToppings.filter(x=>x.name != topping.name);
    } else {
      this.selectedMediumSizeToppings.push(topping);
    }

    this.calculateMediumSizePrice();
    this.prepareMediumSizeOffer();
  }

  toggleLargeSizeTopping(topping: Topping): void {
    if (this.selectedLargeSizeToppings.includes(topping)) {
      this.selectedLargeSizeToppings = this.selectedLargeSizeToppings.filter(x=>x.name != topping.name);
    } else {
      this.selectedLargeSizeToppings.push(topping);
    }

    this.calculateLargeSizePrice();
    this.prepareLargeSizeOffer();
  }

  toggleXLargeSizeTopping(topping: Topping): void {
    if (this.selectedXLargeSizeToppings.includes(topping)) {
      this.selectedXLargeSizeToppings = this.selectedXLargeSizeToppings.filter(x=>x.name != topping.name);
    } else {
      this.selectedXLargeSizeToppings.push(topping);
    }

    this.calculateXLargeSizePrice();
  }

  isSmallSizeToppingSelected(topping: Topping): boolean {
    return this.selectedSmallSizeToppings.includes(topping);
  }

  isMediumSizeToppingSelected(topping: Topping): boolean {
    return this.selectedMediumSizeToppings.includes(topping);
  }

  isLargeSizeToppingSelected(topping: Topping): boolean {
    return this.selectedLargeSizeToppings.includes(topping);
  }
  
  isXLargeSizeToppingSelected(topping: Topping): boolean {
    return this.selectedXLargeSizeToppings.includes(topping);
  }

  calculateSmallSizePrice() {
    let size= "Small";
    let basePrice = this.pizzaSizes.find(p => p.name === size)?.price || 0;
    let toppingsPrice = 0;
    this.selectedSmallSizeToppings.forEach(topping => {
      toppingsPrice += topping.price;
    });

    this.totalSmallSizePrice = basePrice + toppingsPrice;
  }

  calculateMediumSizePrice() {
    let size= "Medium";
    let basePrice = this.pizzaSizes.find(p => p.name === size)?.price || 0;
    let toppingsPrice = 0;
    this.selectedMediumSizeToppings.forEach(topping => {
      toppingsPrice += topping.price;
    });

    this.totalMediumSizePrice = basePrice + toppingsPrice;
  }

  calculateLargeSizePrice() {
    let size= "Large";
    let basePrice = this.pizzaSizes.find(p => p.name === size)?.price || 0;
    let toppingsPrice = 0;
    this.selectedLargeSizeToppings.forEach(topping => {
      toppingsPrice += topping.price;
    });

    this.totalLargeSizePrice = basePrice + toppingsPrice;
  }

  calculateXLargeSizePrice() {
    let size= "Extra Large";
    let basePrice = this.pizzaSizes.find(p => p.name === size)?.price || 0;
    let toppingsPrice = 0;
    this.selectedXLargeSizeToppings.forEach(topping => {
      toppingsPrice += topping.price;
    });

    this.totalXLargeSizePrice = basePrice + toppingsPrice;
  }

  prepareMediumSizeOffer() {
    let toppingsCount = this.selectedMediumSizeToppings.length;

    if (toppingsCount === 2) {
      this.mediumSizeAppliedOffer = "Offer 1";
      this.totalMediumSizePriceWithoutOffer = this.totalMediumSizePrice;
      this.totalMediumSizePrice = 5;
    } else if (toppingsCount === 4) {
      this.mediumSizeAppliedOffer = "Offer 2";
      this.totalMediumSizePriceWithoutOffer = this.totalMediumSizePrice;
      this.totalMediumSizePrice = 9;
    }
    else {
      this.mediumSizeAppliedOffer = "";
      this.totalMediumSizePriceWithoutOffer = 0;
    }
  }

  prepareLargeSizeOffer() {
    let toppingsCount = this.selectedLargeSizeToppings.length;

    let isPepperoniIncluded = this.selectedLargeSizeToppings.some(x=>x.name === "Pepperoni");
    let isBbqChickenIncluded = this.selectedLargeSizeToppings.some(x=>x.name === "Barbeque Chicken");

    if(isPepperoniIncluded) {
      toppingsCount++;
    }

    if(isBbqChickenIncluded) {
      toppingsCount++;
    }

    if (toppingsCount === 4) {
      this.largeSizeAppliedOffer = "Offer 3";
      this.totalLargeSizePriceWithoutOffer = this.totalLargeSizePrice;
      this.totalLargeSizePrice = this.totalLargeSizePrice / 2;
    }
    else {
      this.largeSizeAppliedOffer = "";
      this.totalLargeSizePriceWithoutOffer = 0;
    }
  }
}
