import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Produit {
  id: number;
  nom: string;
  image: string;
  prixUnitaire: number;
  quantite: number;
  category: string;
}

export interface Boutique {
  id: number;
  nom: string;
  produits: Produit[];
}

export interface Adresse {
  prenom: string;
  nom: string;
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
}

export interface Paiement {
  methode: 'carte' | 'paypal' | 'virement' | '';
  numeroCarte: string;
  nomTitulaire: string;
  expiration: string;
  cvv: string;
}

export interface DetailCommande {
  produit: string;
  quantite: number;
  prix: number;
  statut: 'confirmé' | 'en-préparation' | 'expédié' | 'livré';
}

export interface CommandeValidee {
  id: string;
  statut: 'en-cours' | 'expédiée' | 'livrée';
  boutique: string;
  total: number;
  details: DetailCommande[];
}

// ── Shared readonly catalog ────────────────────────────────────────────────────
const BOUTIQUES_INITIALES: ReadonlyArray<Boutique> = [
  {
    id: 1,
    nom: 'Boutique A — Maroquinerie',
    produits: [
      { id: 1, nom: 'Sac Cuir Artisanal', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80', prixUnitaire: 189, quantite: 1, category: 'Maroquinerie' },
      { id: 2, nom: 'Ceinture Tressée', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80', prixUnitaire: 65, quantite: 2, category: 'Maroquinerie' },
    ],
  },
  {
    id: 2,
    nom: 'Boutique C — Accessoires',
    produits: [
      { id: 3, nom: 'Montre Minimaliste', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80', prixUnitaire: 249, quantite: 1, category: 'Accessoires' },
      { id: 4, nom: 'Bracelet Jonc Or', image: 'https://images.unsplash.com/photo-1573408301185-9519f94e4fd6?w=200&q=80', prixUnitaire: 118, quantite: 1, category: 'Accessoires' },
    ],
  },
  {
    id: 3,
    nom: 'Boutique E — Tech',
    produits: [
      { id: 5, nom: 'Casque Audio Studio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', prixUnitaire: 179, quantite: 1, category: 'Tech' },
    ],
  },
];
@Component({
  selector: 'app-panier-page-client',
  imports: [CommonModule,FormsModule],
  templateUrl: './panier-page-client.component.html',
  styleUrl: './panier-page-client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanierPageClientComponent {
  // ── Step state ─────────────────────────────────────────────────────────────
  currentStep = signal(1);
  readonly steps = ['Panier', 'Adresse', 'Paiement', 'Confirmation'];

  // ── Cart state (deep clone so each user has isolated state) ────────────────
  boutiques = signal<Boutique[]>(
    JSON.parse(JSON.stringify(BOUTIQUES_INITIALES))
  );

  expandedBoutiques = signal<Record<number, boolean>>({ 1: true, 2: false, 3: false });
  expandedCommandes = signal<Record<string, boolean>>({});

  // ── Address ────────────────────────────────────────────────────────────────
  adresse = signal<Adresse>({
    prenom: '',
    nom: '',
    rue: '',
    ville: '',
    codePostal: '',
    pays: 'France',
  });

  // ── Payment ────────────────────────────────────────────────────────────────
  paiement = signal<Paiement>({
    methode: '',
    numeroCarte: '',
    nomTitulaire: '',
    expiration: '',
    cvv: '',
  });

  // ── Order state ────────────────────────────────────────────────────────────
  commandeValidee = signal(false);
  commandesValidees = signal<CommandeValidee[]>([]);
  removingId = signal<number | null>(null);

  // ── Computed ───────────────────────────────────────────────────────────────
  readonly totalGeneral = computed(() =>
    this.boutiques().reduce(
      (sum, b) => sum + b.produits.reduce((s, p) => s + p.prixUnitaire * p.quantite, 0),
      0
    )
  );

  readonly totalItems = computed(() =>
    this.boutiques().reduce((sum, b) => sum + b.produits.reduce((s, p) => s + p.quantite, 0), 0)
  );

  getBoutiqueTotal(boutiqueId: number): number {
    const b = this.boutiques().find(b => b.id === boutiqueId);
    return b ? b.produits.reduce((s, p) => s + p.prixUnitaire * p.quantite, 0) : 0;
  }

  getBoutiqueItems(boutiqueId: number): number {
    const b = this.boutiques().find(b => b.id === boutiqueId);
    return b ? b.produits.reduce((s, p) => s + p.quantite, 0) : 0;
  }

  // ── Cart actions ───────────────────────────────────────────────────────────
  toggleBoutique(id: number): void {
    this.expandedBoutiques.update(m => ({ ...m, [id]: !m[id] }));
  }

  updateQuantite(boutiqueId: number, produitIndex: number, delta: number): void {
    this.boutiques.update(bs =>
      bs.map(b => {
        if (b.id !== boutiqueId) return b;
        return {
          ...b,
          produits: b.produits.map((p, i) => {
            if (i !== produitIndex) return p;
            const newQty = Math.max(1, p.quantite + delta);
            return { ...p, quantite: newQty };
          }),
        };
      })
    );
  }

  removeProduit(boutiqueId: number, produitIndex: number): void {
    const produit = this.boutiques().find(b => b.id === boutiqueId)?.produits[produitIndex];
    if (produit) this.removingId.set(produit.id);

    setTimeout(() => {
      this.boutiques.update(bs =>
        bs
          .map(b => {
            if (b.id !== boutiqueId) return b;
            return { ...b, produits: b.produits.filter((_, i) => i !== produitIndex) };
          })
          .filter(b => b.produits.length > 0)
      );
      this.removingId.set(null);
    }, 350);
  }

  // ── Address actions ────────────────────────────────────────────────────────
  setAdresseField(field: keyof Adresse, value: string): void {
    this.adresse.update(a => ({ ...a, [field]: value }));
  }

  setPaiementField(field: keyof Paiement, value: string): void {
    this.paiement.update(p => ({ ...p, [field]: value }));
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  nextStep(): void {
    if (this.currentStep() < 4) this.currentStep.update(s => s + 1);
  }

  previousStep(): void {
    if (this.currentStep() > 1) this.currentStep.update(s => s - 1);
  }

  goToStep(step: number): void {
    if (step < this.currentStep()) this.currentStep.set(step);
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  validerCommande(): void {
    const orders: CommandeValidee[] = this.boutiques().map(b => ({
      id: `CMD-${Date.now()}-${b.id}`,
      statut: 'en-cours',
      boutique: b.nom,
      total: this.getBoutiqueTotal(b.id),
      details: b.produits.map(p => ({
        produit: p.nom,
        quantite: p.quantite,
        prix: p.prixUnitaire * p.quantite,
        statut: 'confirmé',
      })),
    }));

    this.commandesValidees.set(orders);
    this.commandeValidee.set(true);
  }

  toggleDetailsCommande(id: string): void {
    this.expandedCommandes.update(m => ({ ...m, [id]: !m[id] }));
  }

  reinitialiserPanier(): void {
    this.boutiques.set(JSON.parse(JSON.stringify(BOUTIQUES_INITIALES)));
    this.adresse.set({ prenom: '', nom: '', rue: '', ville: '', codePostal: '', pays: 'France' });
    this.paiement.set({ methode: '', numeroCarte: '', nomTitulaire: '', expiration: '', cvv: '' });
    this.currentStep.set(1);
    this.commandeValidee.set(false);
    this.commandesValidees.set([]);
    this.expandedBoutiques.set({ 1: true, 2: false, 3: false });
  }

  formatCardNumber(value: string): string {
    return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      'en-cours': 'En cours',
      'expédiée': 'Expédiée',
      'livrée': 'Livrée',
      'confirmé': 'Confirmé',
      'en-préparation': 'En préparation',
      'expédié': 'Expédié',
      'livré': 'Livré',
    };
    return map[statut] ?? statut;
  }
}
