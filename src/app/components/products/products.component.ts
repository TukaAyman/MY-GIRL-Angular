import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  category = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;
    const obs = this.category
      ? this.productService.getProductsByCategory(this.category)
      : this.productService.getProducts();

    obs.subscribe({
      next: (products) => { this.products = products; this.loading = false; },
      error: () => this.loading = false
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
