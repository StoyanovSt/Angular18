import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ProductInterface } from '../shared/product.interface';
import { StyleChangeDirective } from '../shared/directives/style-change.directive';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { FormatNumberPipe } from '../shared/pipes/format-number.pipe';
import { TablePaginationComponent } from '../shared/table-pagination/pagination.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  imports: [CommonModule, 
    MatTableModule, 
    MatProgressSpinnerModule, 
    StyleChangeDirective, 
    FormatNumberPipe, 
    DragDropModule, 
    TablePaginationComponent],
  standalone: true,
})
export class LandingComponent {
  private filter$ = new BehaviorSubject<string>('');
  private data$ = new BehaviorSubject<ProductInterface[]>([]);
  public data$$ = this.data$.pipe(
    combineLatestWith(this.filter$),
    map(([products, filter]: [ProductInterface[], string]) => {
      return filter.trim().length
        ? products.filter((product: ProductInterface) => product.name.toLowerCase().startsWith(filter.toLowerCase()))
        : products
    })
  );
  dataLoaded: boolean = false;
  columns: string[] = ['productId', 'name', 'category', 'price', 'description'];
  productToEdit: ProductInterface | null = null;
  currentPage: number = 1;
  pageLimit: number = 3;
  totalEntities!: number;
  
  constructor() {
    setTimeout(() => {
      this.data$.next([
        { productId: 101, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 59.99, isInEditMode: false, description: 'High-quality wireless Bluetooth headphones with noise cancellation.' },
        { productId: 102, name: 'Smartphone - 128GB Storage', category: 'Electronics', price: 499.99, isInEditMode: false, description: 'A fast and reliable smartphone with 128GB storage.' },
        { productId: 103, name: '4K Ultra HD TV - 55 inches', category: 'Electronics', price: 699.99, isInEditMode: false, description: 'Experience stunning visuals with this 55-inch 4K Ultra HD smart TV.' },
        { productId: 104, name: 'Gaming Laptop - 16GB RAM', category: 'Computers', price: 1299.99, isInEditMode: false, description: 'A high-performance gaming laptop with 16GB RAM and powerful graphics.' },
        { productId: 105, name: 'Electric Toothbrush - Smart Series', category: 'Health & Beauty', price: 89.99, isInEditMode: false, description: 'Smart electric toothbrush with customizable brushing modes and a timer.' },
        { productId: 106, name: 'Portable Power Bank - 10,000mAh', category: 'Accessories', price: 29.99, isInEditMode: false, description: 'Compact and powerful portable power bank with 10,000mAh capacity.' },
        { productId: 107, name: 'Stylish Leather Wallet', category: 'Fashion', price: 49.99, isInEditMode: false, description: 'Genuine leather wallet with multiple card slots and a sleek design.' },
        { productId: 108, name: 'Organic Green Tea - 30 Pack', category: 'Food & Beverages', price: 15.99, isInEditMode: false, description: '100% organic green tea leaves in a convenient 30-pack box.' },
        { productId: 109, name: 'Bluetooth Speaker - Waterproof', category: 'Electronics', price: 39.99, isInEditMode: false, description: 'Waterproof Bluetooth speaker with excellent sound quality and portability.' },
        { productId: 110, name: 'Casual Sneakers - Size 10', category: 'Footwear', price: 69.99, isInEditMode: false, description: 'Comfortable and stylish sneakers, perfect for everyday use.' },
      ]);
      this.totalEntities = this.data$.getValue().length;
      this.dataLoaded = true;
    }, 2000);
  }

  public onSearchProduct(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter$.next(value);
  }

  public setProductInEditMode(productId: number): void {
    this.data$.next(
      this.data$.value.map((product: ProductInterface) => ({
        ...product,
        isInEditMode: product.productId === productId ? true : false,
      }))
    );
    this.productToEdit =
      this.data$.value.find(
        (product: ProductInterface) => product.productId === productId
      ) || null;
  }

  public editProductName(event: Event): void {
    if (!this.productToEdit) return;
    const name = (event.target as HTMLInputElement).value;
    this.productToEdit.name = name;
  }

  public onBlur(): void {
    this.data$.next(
      this.data$.value.map((product: ProductInterface) => {
        if (product.isInEditMode) {
          return {
            ...product,
            isInEditMode: false,
            name: this.productToEdit?.name ?? product.name,
          };
        }

        return product;
      })
    );

    this.productToEdit = null;
  }

  public reorderRow(event:  CdkDragDrop<any>): void {
    const data = this.data$.getValue();
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const movedItem = data[previousIndex];
    data.splice(previousIndex, 1);
    data.splice(currentIndex, 0, movedItem);
    this.data$.next([...data]);
  }

  public changePage(page: number): void {
    this.currentPage = page;
  }
}
