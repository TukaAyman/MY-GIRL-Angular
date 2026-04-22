import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/categories']);
      return;
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  onSubmit(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loading = true;
    this.error = '';
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (users) => {
        this.loading = false;
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.cartService.getCart(user.id.toString()).subscribe();
          this.router.navigate(['/categories']);
        } else {
          this.error = 'Invalid email or password. Please try again.';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Login failed. Please check your connection.';
      }
    });
  }
}
