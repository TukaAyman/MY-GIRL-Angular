import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  visibleSections = new Set<string>();
  activeTestimonial = 0;
  private testimonialTimer: ReturnType<typeof setInterval> | null = null;
  private observer!: IntersectionObserver;
 
  stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '200+', label: 'Premium Products' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Cruelty Free' }
  ];
 
  testimonials = [
    { name: 'Nour Hassan', role: 'Beauty Blogger', text: 'The skincare collection transformed my routine. Every product is pure luxury — my skin has never looked better.', avatar: 'NH' },
    { name: 'Layla Ahmed', role: 'Makeup Artist', text: 'My Girl has the most stunning makeup range I\'ve ever worked with. The pigmentation is unreal!', avatar: 'LA' },
    { name: 'Rana Khalil', role: 'Lifestyle Influencer', text: 'The perfume collection is divine. La Rose Éternelle is my signature scent — I get compliments every single day.', avatar: 'RK' }
  ];
 
  features = [
    {
      img: 'https://www.skincare.com/-/media/project/loreal/brand-sites/sdc/americas/us/articles/2020/02_february/05-galentines-day-gifts/valentines-day-skincare-gifts-for-women-hero-scd-020520.jpg',
      tag: 'Skincare',
      title: 'Glow From Within',
      desc: 'Science-backed formulas with the finest natural extracts. Your skin deserves nothing less than extraordinary.'
    },
    {
      img: 'https://www.beautycoursesonline.com.au/wp-content/uploads/2024/12/shutterstock_2198190745-1.jpg',
      tag: 'Makeup',
      title: 'Color That Captivates',
      desc: 'Pigment-rich, long-wear formulas crafted to express every shade of you — bold, soft, and everything in between.'
    },
    {
      img: 'https://cdn.salla.sa/wOelm/288cf335-8095-4a30-8f7b-b6f766cf6fc2-1000x523.33333333333-e9URYChq0ePXa3aP35yoQ03qT2MDKduipXgwcJg8.png',
      tag: 'Perfumes',
      title: 'Scents That Linger',
      desc: 'Rare florals, warm musks, and exotic blends. Fragrances that tell your story before you say a word.'
    }
  ];
 
  constructor(private router: Router, private el: ElementRef) {}
 
  ngOnInit(): void {
    this.testimonialTimer = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 4000);
 
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.visibleSections.add(entry.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );
 
    setTimeout(() => {
      const sections = this.el.nativeElement.querySelectorAll('[id]');
      sections.forEach((s: Element) => this.observer.observe(s));
    }, 100);
  }
 
  ngOnDestroy(): void {
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    this.observer?.disconnect();
  }
 
  isVisible(id: string): boolean {
    return this.visibleSections.has(id);
  }
 
  shopNow(): void {
    this.router.navigate(['/login']);
  }
 
  setTestimonial(i: number): void {
    this.activeTestimonial = i;
  }
}