import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;
  addedToCart = false;
  addingToCart = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (product) => { this.product = product; this.loading = false; },
      error: () => { this.loading = false; this.router.navigate(['/products']); }
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  decrement(): void {
    if (this.quantity > 1) this.quantity--;
  }

  increment(): void {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

 addToCart(): void {
  if (!this.product || this.product.stock === 0) return;

  const userId = this.authService.getUserId();
  if (!userId) { 
    this.router.navigate(['/login']); 
    return; 
  }

  this.addingToCart = true;

  const item = {
    userId: userId,
    productId: this.product.id,
    quantity: this.quantity,
    name: this.product.name,
    price: this.product.price
  };

  this.cartService.addToCart(item).subscribe({
    next: () => {

      const updatedProduct = {
        ...this.product!,
        stock: this.product!.stock - this.quantity
      };

      this.productService.updateProduct(this.product!.id, updatedProduct).subscribe({
        next: () => {
          this.product!.stock -= this.quantity;

          this.addingToCart = false;
          this.addedToCart = true;
          setTimeout(() => this.addedToCart = false, 2500);
        },
        error: () => {
          this.addingToCart = false;
        }
      });

    },
    error: () => { 
      this.addingToCart = false; 
    }
  });
}
  goBack(): void {
    this.router.navigate(['/products'], {
      queryParams: this.product ? { category: this.product.category } : {}
    });
  }
}
