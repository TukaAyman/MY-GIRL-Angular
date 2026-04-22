import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000';
  private cartCount$ = new BehaviorSubject<number>(0);

  cartCount = this.cartCount$.asObservable();

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart?userId=${userId}`).pipe(
      tap(items => this.cartCount$.next(items.length))
    );
  }

  addToCart(item: Omit<CartItem, 'id'>): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/cart`, item).pipe(
      tap(() => this.cartCount$.next(this.cartCount$.value + 1))
    );
  }

  updateQuantity(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${this.baseUrl}/cart/${id}`, { quantity });
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => this.cartCount$.next(Math.max(0, this.cartCount$.value - 1)))
    );
  }

  updateCartCount(count: number): void {
    this.cartCount$.next(count);
  }
}