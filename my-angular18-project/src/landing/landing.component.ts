import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductInterface } from '../shared/product.interface';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  standalone: true,
})
export class LandingComponent {
  private filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  dataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  columns: string[] = ['productId', 'name', 'category', 'price', 'description'];
  private data$: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<
    ProductInterface[]
  >([]);
  data$$ = this.data$.asObservable();

  constructor() {
    setTimeout(() => {
      this.data$.next([
        {
          productId: 101,
          name: 'Wireless Bluetooth Headphones',
          category: 'Electronics',
          price: 59.99,
          description:
            'High-quality wireless Bluetooth headphones with noise cancellation.',
        },
        {
          productId: 102,
          name: 'Smartphone - 128GB Storage',
          category: 'Electronics',
          price: 499.99,
          description:
            'A fast and reliable smartphone with a 128GB storage capacity.',
        },
        {
          productId: 103,
          name: '4K Ultra HD TV - 55 inches',
          category: 'Electronics',
          price: 699.99,
          description:
            'Experience stunning visuals with this 55-inch 4K Ultra HD smart TV.',
        },
        {
          productId: 104,
          name: 'Gaming Laptop - 16GB RAM',
          category: 'Computers',
          price: 1299.99,
          description:
            'A high-performance gaming laptop with 16GB RAM and powerful graphics.',
        },
        {
          productId: 105,
          name: 'Electric Toothbrush - Smart Series',
          category: 'Health & Beauty',
          price: 89.99,
          description:
            'Smart electric toothbrush with customizable brushing modes and a timer.',
        },
        {
          productId: 106,
          name: 'Portable Power Bank - 10,000mAh',
          category: 'Accessories',
          price: 29.99,
          description:
            'Compact and powerful portable power bank with 10,000mAh capacity.',
        },
        {
          productId: 107,
          name: 'Stylish Leather Wallet',
          category: 'Fashion',
          price: 49.99,
          description:
            'Genuine leather wallet with multiple card slots and a sleek design.',
        },
        {
          productId: 108,
          name: 'Organic Green Tea - 30 Pack',
          category: 'Food & Beverages',
          price: 15.99,
          description:
            '100% organic green tea leaves in a convenient 30-pack box.',
        },
        {
          productId: 109,
          name: 'Bluetooth Speaker - Waterproof',
          category: 'Electronics',
          price: 39.99,
          description:
            'Waterproof Bluetooth speaker with excellent sound quality and portability.',
        },
        {
          productId: 110,
          name: 'Casual Sneakers - Size 10',
          category: 'Footwear',
          price: 69.99,
          description:
            'Comfortable and stylish sneakers, perfect for everyday use.',
        },
      ]);
      this.dataLoaded$.next(true);
    }, 2000);
  }

  public onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter$.next(value);
    this.data$$ = this.data$.pipe(
      combineLatestWith(this.filter$),
      map(([products, filter]: [ProductInterface[], string]) => {
        const searchedData = !filter.trim().length
          ? products
          : products.filter((p: ProductInterface) =>
              p.name.toLowerCase().startsWith(filter.toLowerCase())
            );
        return searchedData;
      })
    );
  }
}
