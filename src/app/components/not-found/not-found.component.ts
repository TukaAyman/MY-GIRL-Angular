import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="nf-page">
      <div class="nf-content">
        <div class="nf-icon">🌸</div>
        <h1 class="nf-code">404</h1>
        <h2 class="nf-title">Page Not Found</h2>
        <p class="nf-sub">Oops! The page you're looking for seems to have wandered off. Let's get you back to something beautiful.</p>
        <div class="nf-actions">
          <a routerLink="/" class="btn-primary">Go Home</a>
          <a routerLink="/categories" class="btn-outline">Shop Now</a>
        </div>
        <div class="nf-sparkles">
          <span>✦</span><span>★</span><span>✦</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nf-page {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--bg), var(--soft-pink));
      padding: 40px 20px;
    }
    .nf-content {
      text-align: center;
      animation: scaleIn 0.4s ease;
      max-width: 520px;
    }
    .nf-icon { font-size: 4rem; display: block; margin-bottom: 8px; }
    .nf-code {
      font-size: 7rem;
      color: var(--primary);
      font-family: 'Playfair Display', serif;
      line-height: 1;
      margin-bottom: 8px;
      text-shadow: 0 4px 20px rgba(183,110,121,0.2);
    }
    .nf-title { font-size: 2rem; margin-bottom: 14px; }
    .nf-sub { color: var(--muted-pink); line-height: 1.7; margin-bottom: 36px; font-size: 0.98rem; }
    .nf-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .nf-sparkles { margin-top: 40px; display: flex; gap: 20px; justify-content: center; color: var(--primary); font-size: 1.3rem; opacity: 0.5; }
  `]
})
export class NotFoundComponent {}
