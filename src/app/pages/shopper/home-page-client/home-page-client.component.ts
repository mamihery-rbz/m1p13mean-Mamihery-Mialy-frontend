import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  shop: string;
  image: string;
  badge?: string;       // 'Nouveau' | 'Promo' | 'Tendance'
  discount?: number;    // pourcentage de réduction
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  category: string;
  shop: string;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
}

// ─── Shared, immutable product catalog ───────────────────────────────────────
// Defini en dehors du composant pour être partagé entre toutes les instances
// sans copier les données (read-only reference).
const PRODUCT_CATALOG: ReadonlyArray<Product> = [
  { id: 1,  name: 'Sac Cuir Artisanal',     price: 189,  category: 'Maroquinerie', shop: 'Boutique A', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', badge: 'Tendance',  rating: 4.8, reviews: 124, stock: 5 },
  { id: 2,  name: 'Sneakers Urban Pro',      price: 129,  category: 'Chaussures',   shop: 'Boutique B', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', badge: 'Nouveau',   rating: 4.6, reviews: 89,  stock: 12 },
  { id: 3,  name: 'Montre Minimaliste',      price: 249,  category: 'Accessoires',  shop: 'Boutique C', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', badge: 'Tendance',  rating: 4.9, reviews: 201, stock: 3 },
  { id: 4,  name: 'Veste Lin Premium',       price: 215,  category: 'Vêtements',    shop: 'Boutique A', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',                     rating: 4.5, reviews: 67,  stock: 8 },
  { id: 5,  name: 'Parfum Oud Intense',      price: 95,   category: 'Beauté',       shop: 'Boutique D', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80', badge: 'Promo',     discount: 20, rating: 4.7, reviews: 153, stock: 20 },
  { id: 6,  name: 'Casque Audio Studio',     price: 179,  category: 'Tech',         shop: 'Boutique E', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', badge: 'Nouveau',   rating: 4.4, reviews: 45,  stock: 7 },
  { id: 7,  name: 'Carnet Cuir Gravé',       price: 48,   category: 'Maroquinerie', shop: 'Boutique B', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80',                     rating: 4.3, reviews: 38,  stock: 25 },
  { id: 8,  name: 'Ceinture Tressée',        price: 65,   category: 'Accessoires',  shop: 'Boutique A', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', badge: 'Promo',     discount: 15, rating: 4.2, reviews: 29,  stock: 18 },
  { id: 9,  name: 'Robe Soirée Satin',       price: 285,  category: 'Vêtements',    shop: 'Boutique C', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', badge: 'Tendance',  rating: 4.9, reviews: 312, stock: 4 },
  { id: 10, name: 'Lunettes Acétate',        price: 155,  category: 'Accessoires',  shop: 'Boutique D', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',                     rating: 4.6, reviews: 77,  stock: 9 },
  { id: 11, name: 'Bougie Soja Luxe',        price: 38,   category: 'Beauté',       shop: 'Boutique E', image: 'https://images.unsplash.com/photo-1602607910680-5dd7e1066c42?w=400&q=80', badge: 'Nouveau',   rating: 4.1, reviews: 22,  stock: 30 },
  { id: 12, name: 'Polo Coton Piqué',        price: 79,   category: 'Vêtements',    shop: 'Boutique B', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80',                     rating: 4.4, reviews: 56,  stock: 15 },
  { id: 13, name: 'Porte-monnaie Suède',     price: 55,   category: 'Maroquinerie', shop: 'Boutique D', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', badge: 'Promo',     discount: 10, rating: 4.0, reviews: 18,  stock: 22 },
  { id: 14, name: 'Bracelet Jonc Or',        price: 118,  category: 'Accessoires',  shop: 'Boutique C', image: 'https://images.unsplash.com/photo-1573408301185-9519f94e4fd6?w=400&q=80',                     rating: 4.7, reviews: 94,  stock: 6 },
  { id: 15, name: 'Sérum Éclat Botanique',   price: 72,   category: 'Beauté',       shop: 'Boutique A', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', badge: 'Tendance',  rating: 4.8, reviews: 187, stock: 11 },
];
@Component({
  selector: 'app-home-page-client',
  imports: [CommonModule,FormsModule],
  templateUrl: './home-page-client.component.html',
  styleUrl: './home-page-client.component.css'
})
export class HomePageClientComponent implements OnInit, OnDestroy {
constructor(private cdr: ChangeDetectorRef) {}

  // ─── Signals (Angular 16+) pour la réactivité fine ───────────────────────
  // Chaque client a son propre état isolé via ces signals
  readonly filters = signal<Filters>({ category: '', shop: '', minPrice: null, maxPrice: null, search: '' });
  readonly cart = signal<CartItem[]>([]);
  readonly isCartOpen = signal(false);
  readonly addedProductId = signal<number | null>(null);

  // ─── Dérivés (computed = pas de duplication d'état) ──────────────────────
  readonly filteredProducts = computed(() => {
    const f = this.filters();
    return PRODUCT_CATALOG.filter(p => {
      if (f.category && p.category !== f.category) return false;
      if (f.shop && p.shop !== f.shop) return false;
      if (f.minPrice !== null && p.price < f.minPrice) return false;
      if (f.maxPrice !== null && p.price > f.maxPrice) return false;
      if (f.search && !p.name.toLowerCase().includes(f.search.toLowerCase())) return false;
      return true;
    });
  });

  readonly cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly cartCount = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  // ─── Top 5 produits (tri par reviews * rating — partagé, calculé une fois) ──
  readonly topSellingProducts: ReadonlyArray<Product> = [...PRODUCT_CATALOG]
    .sort((a, b) => b.reviews * b.rating - a.reviews * a.rating)
    .slice(0, 5);

  // ─── Listes de filtres (dérivées du catalog, partagées) ──────────────────
  readonly categories: ReadonlyArray<string> = [...new Set(PRODUCT_CATALOG.map(p => p.category))].sort();
  readonly shops: ReadonlyArray<string> = [...new Set(PRODUCT_CATALOG.map(p => p.shop))].sort();

  // ─── État local UI ────────────────────────────────────────────────────────
  heroSlide = 0;
  private heroInterval?: ReturnType<typeof setInterval>;

  heroSlides = [
    { tag: 'Nouvelle Collection', title: 'Automne\nHiver 2025', sub: 'Des pièces pensées pour durer.', cta: 'Découvrir', color: '#d4a853' },
    { tag: 'Offre Limitée', title: 'Jusqu\'à\n−20%', sub: 'Sur une sélection de produits.', cta: 'En profiter', color: '#e07a5f' },
    { tag: 'Exclusivités', title: 'Artisanat\nLocal', sub: 'Soutenir les créateurs d\'ici.', cta: 'Explorer', color: '#81b29a' },
  ];

  ngOnInit(): void {
    // Auto-slide toutes les 5s — chaque instance a son propre timer
    this.heroInterval = setInterval(() => {
      this.heroSlide = (this.heroSlide + 1) % this.heroSlides.length;
      this.cdr.markForCheck();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.heroInterval) clearInterval(this.heroInterval);
  }

  // ─── Filtres ──────────────────────────────────────────────────────────────
  setFilter(key: keyof Filters, value: any): void {
    this.filters.update(f => ({ ...f, [key]: value }));
  }

  resetFilters(): void {
    this.filters.set({ category: '', shop: '', minPrice: null, maxPrice: null, search: '' });
  }

  // ─── Panier (état isolé par instance = par client) ────────────────────────
  addToCart(product: Product): void {
    this.cart.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { product, quantity: 1 }];
    });

    // Animation feedback
    this.addedProductId.set(product.id);
    setTimeout(() => this.addedProductId.set(null), 1200);
  }

  removeFromCart(productId: number): void {
    this.cart.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, delta: number): void {
    this.cart.update(items =>
      items
        .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  toggleCart(): void {
    this.isCartOpen.update(v => !v);
  }

  getDiscountedPrice(product: Product): number {
    return product.discount ? product.price * (1 - product.discount / 100) : product.price;
  }

  isInCart(productId: number): boolean {
    return this.cart().some(i => i.product.id === productId);
  }

  trackById(_: number, item: { id?: number; product?: Product }): number {
    return item.id ?? item.product!.id;
  }
}
