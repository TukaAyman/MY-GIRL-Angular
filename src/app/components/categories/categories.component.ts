import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Category {
  name: string;
  label: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      name: 'Makeup',
      label: 'Makeup',
      description: 'Lipsticks, foundations, palettes & more for your perfect look',
      image: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-cosmetics-make-up-scene-photography-advertising-background-image_2216431.jpg'
    },
    {
      name: 'Skincare',
      label: 'Skincare',
      description: 'Serums, moisturizers, oils & cleansers for glowing skin',
      image: 'https://png.pngtree.com/background/20230519/original/pngtree-cosmetics-and-skin-care-products-on-a-pink-background-picture-image_2662362.jpg'
    },
    {
      name: 'Perfumes',
      label: 'Perfumes',
      description: 'Signature scents, body mists & luxury fragrances',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/053/170/813/small/display-of-elegant-pink-perfume-bottles-artistically-arranged-on-a-gentle-fabric-background-photo.jpg'
    },
    {
      name: 'Manicure',
      label: 'Manicure',
      description: 'Nail polishes, tools, cuticle care & nail art essentials',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/038/812/842/small/ai-generated-beautiful-background-for-manicure-salon-extensions-advertising-free-photo.jpeg'
    }
  ];

  constructor(private router: Router) {}

  selectCategory(category: string): void {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}