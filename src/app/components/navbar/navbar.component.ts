import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  cartCount = 0;
  isMenuOpen = false;
  private sub!: Subscription;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.sub = this.cartService.cartCount.subscribe(count => this.cartCount = count);
    if (this.currentUser) {
      this.cartService.getCart(this.currentUser.id).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.cartService.updateCartCount(0);
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
