import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'categories', canActivate: [authGuard], loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent) },
  { path: 'products', canActivate: [authGuard], loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:id', canActivate: [authGuard], loadComponent: () => import('./components/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'cart', canActivate: [authGuard], loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: 'orders', canActivate: [authGuard], loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
