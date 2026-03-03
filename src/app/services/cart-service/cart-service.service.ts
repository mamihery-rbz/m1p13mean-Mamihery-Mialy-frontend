import { Injectable, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';

export interface CartItem {
  productId: string;
  name: string;
  price: number; // en centimes
  quantity: number;
  shopId: string;
  shopName: string;
  image?: string;
  maxStock?: number;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'user_carts';
  private currentUserId = signal<string | null>(null);

  // Signal pour le panier de l'utilisateur courant
  private cartItems = signal<CartItem[]>([]);

  // Signaux calculés
  public items = this.cartItems.asReadonly();
  public itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  public totalPrice = computed(() => this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0));
  public totalPriceFormatted = computed(() => this.totalPrice());
  public shopId = computed(() => this.cartItems().length > 0 ? this.cartItems()[0].shopId : null);
  public shopName = computed(() => this.cartItems().length > 0 ? this.cartItems()[0].shopName : null);
  public hasItems = computed(() => this.cartItems().length > 0);

  constructor(private router: Router) {
    // Écouter les changements de connexion
    this.loadUserCart();

    // Sauvegarder dans localStorage à chaque modification
    effect(() => {
      this.saveUserCart();
    });
  }

  // Charger le panier de l'utilisateur
  private loadUserCart(): void {
    // Récupérer l'utilisateur connecté (adaptez selon votre système d'auth)
    const user = this.getCurrentUser();
    if (!user) {
      this.cartItems.set([]);
      return;
    }

    this.currentUserId.set(user.id);
    const allCarts = this.getAllCarts();
    const userCart = allCarts.find(cart => cart.userId === user.id);

    if (userCart) {
      this.cartItems.set(userCart.items);
    } else {
      this.cartItems.set([]);
    }
  }

  // Sauvegarder le panier de l'utilisateur courant
  private saveUserCart(): void {
    const userId = this.currentUserId();
    if (!userId) return;

    const allCarts = this.getAllCarts();
    const existingCartIndex = allCarts.findIndex(cart => cart.userId === userId);

    const userCart: UserCart = {
      userId,
      items: this.cartItems(),
      lastUpdated: new Date()
    };

    if (existingCartIndex >= 0) {
      allCarts[existingCartIndex] = userCart;
    } else {
      allCarts.push(userCart);
    }

    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(allCarts));
  }

  // Récupérer tous les paniers
  private getAllCarts(): UserCart[] {
    const carts = localStorage.getItem(this.CART_STORAGE_KEY);
    return carts ? JSON.parse(carts) : [];
  }

  // Récupérer l'utilisateur connecté (à adapter selon votre système)
  private getCurrentUser(): { id: string; email: string } | null {
    // Exemple avec un token JWT décodé
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      // Décoder le token (simplifié - adaptez selon votre structure)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId || payload.sub || payload.id,
        email: payload.email || ''
      };
    } catch (e) {
      console.error('Erreur lors du décodage du token', e);
      return null;
    }
  }

  // Ajouter un article au panier
  addItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const userId = this.currentUserId();
    if (!userId) {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
      return;
    }

    const currentItems = this.cartItems();
    const existingItem = currentItems.find(i => i.productId === item.productId);

    // Vérifier si on change de boutique
    if (currentItems.length > 0 && currentItems[0].shopId !== item.shopId) {
      if (!confirm('Vous avez déjà des articles d\'une autre boutique dans votre panier. Voulez-vous vider le panier et ajouter cet article ?')) {
        return;
      }
      this.clearCart();
    }

    if (existingItem) {
      // Mettre à jour la quantité
      this.updateQuantity(item.productId, existingItem.quantity + quantity);
    } else {
      // Ajouter nouveau article
      this.cartItems.update(items => [...items, { ...item, quantity }]);
    }

    this.showNotification('Produit ajouté au panier');
  }

  // Mettre à jour la quantité
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }

  // Supprimer un article
  removeItem(productId: string): void {
    this.cartItems.update(items => items.filter(item => item.productId !== productId));
    this.showNotification('Produit retiré du panier');
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems.set([]);
  }

  // Vérifier si un produit est dans le panier
  isInCart(productId: string): boolean {
    return this.cartItems().some(item => item.productId === productId);
  }

  // Obtenir la quantité d'un produit
  getQuantity(productId: string): number {
    return this.cartItems().find(item => item.productId === productId)?.quantity || 0;
  }

  // Formater le prix (centimes → euros)
  private formatPrice(price: number): string {
    return (price / 100).toFixed(2) + ' €';
  }

  // Notification simple
  private showNotification(message: string): void {
    // Vous pouvez implémenter un système de toast ici
    console.log(message);
  }

  // Déconnexion - nettoyer le panier courant
  logout(): void {
    this.currentUserId.set(null);
    this.cartItems.set([]);
  }

  // Changer d'utilisateur (pour test ou admin)
  switchUser(userId: string): void {
    // Cette méthode peut être utilisée pour le développement
    // ou pour les comptes multi-boutiques
    this.currentUserId.set(userId);
    this.loadUserCart();
  }
}
