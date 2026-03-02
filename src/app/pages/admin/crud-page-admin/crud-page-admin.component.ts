
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';

interface Field {
  name: string;
  type: 'text' | 'number' | 'email' | 'date';
}

interface Table {
  name: string;
  icon: string;
  fields: Field[];
}

interface DataItem {
  [key: string]: any;
}

@Component({
  selector: 'app-crud-page-admin',
  imports: [FormsModule,CommonModule],
  templateUrl: './crud-page-admin.component.html',
  styleUrl: './crud-page-admin.component.css'
})
export class CrudPageAdminComponent {
   selectedTable: Table | null = null;
  showForm = false;
  isEditing = false;
  currentItem: DataItem = {};
  tables: Table[] = [];

  constructor(private adminService: AdminService) {
    this.loadTables();
  }

  private loadTables(): void {
    this.adminService.getTable().subscribe((data: any) => {
      this.tables = data;
    });
  }

  // Test data per table
  private testData: { [tableName: string]: DataItem[] } = {
    Boutiques: [
      { id: 1, nom: 'Boutique A', adresse: '12 Rue de la Paix', loyer: 5000, statut: 'Impayée' },
      { id: 2, nom: 'Boutique B', adresse: '34 Avenue Victor Hugo', loyer: 6000, statut: 'Payée' },
      { id: 3, nom: 'Boutique C', adresse: '7 Boulevard Haussmann', loyer: 3200, statut: 'Impayée' },
      { id: 4, nom: 'Boutique D', adresse: '89 Rue du Commerce', loyer: 4200, statut: 'Payée' },
      { id: 5, nom: 'Boutique E', adresse: '3 Place de la République', loyer: 7800, statut: 'Impayée' },
    ],
    Locataires: [
      { id: 1, nom: 'Alice Martin', email: 'alice@mail.com', téléphone: '06 12 34 56 78', boutique: 'Boutique A' },
      { id: 2, nom: 'Bob Dupont', email: 'bob@mail.com', téléphone: '07 98 76 54 32', boutique: 'Boutique B' },
      { id: 3, nom: 'Clara Petit', email: 'clara@mail.com', téléphone: '06 55 44 33 22', boutique: 'Boutique C' },
      { id: 4, nom: 'David Roux', email: 'david@mail.com', téléphone: '07 11 22 33 44', boutique: 'Boutique D' },
    ],
    Paiements: [
      { id: 1, boutique: 'Boutique B', montant: 6000, date: '2025-02-01', statut: 'Confirmé' },
      { id: 2, boutique: 'Boutique D', montant: 4200, date: '2025-02-03', statut: 'Confirmé' },
      { id: 3, boutique: 'Boutique A', montant: 5000, date: '2025-01-28', statut: 'En attente' },
      { id: 4, boutique: 'Boutique E', montant: 7800, date: '2025-01-15', statut: 'Retard' },
    ],
    Contrats: [
      { id: 1, locataire: 'Alice Martin', boutique: 'Boutique A', début: '2024-01-01', fin: '2025-12-31' },
      { id: 2, locataire: 'Bob Dupont', boutique: 'Boutique B', début: '2023-06-01', fin: '2026-05-31' },
      { id: 3, locataire: 'Clara Petit', boutique: 'Boutique C', début: '2024-03-15', fin: '2025-03-14' },
      { id: 4, locataire: 'David Roux', boutique: 'Boutique D', début: '2024-09-01', fin: '2026-08-31' },
    ],
    Incidents: [
      { id: 1, titre: 'Fuite eau', boutique: 'Boutique A', priorité: 'Haute', date: '2025-02-10' },
      { id: 2, titre: 'Panne électrique', boutique: 'Boutique C', priorité: 'Critique', date: '2025-02-14' },
      { id: 3, titre: 'Porte bloquée', boutique: 'Boutique E', priorité: 'Moyenne', date: '2025-02-20' },
    ],
    Utilisateurs: [
      { id: 1, nom: 'Admin Principal', email: 'admin@plateforme.com', rôle: 'Super Admin', 'créé le': '2023-01-01' },
      { id: 2, nom: 'Sophie Lambert', email: 'sophie@plateforme.com', rôle: 'Gestionnaire', 'créé le': '2023-06-15' },
      { id: 3, nom: 'Marc Leblanc', email: 'marc@plateforme.com', rôle: 'Comptable', 'créé le': '2024-01-10' },
    ],
  };

  items: DataItem[] = [];
  private nextId = 100;

  selectTable(table: Table): void {
    this.selectedTable = table;
    this.items = [...(this.testData[table.name] || [])];
    this.showForm = false;
  }

  goBack(): void {
    this.selectedTable = null;
    this.showForm = false;
    this.currentItem = {};
  }

  openAddForm(): void {
    this.isEditing = false;
    this.currentItem = {};
    this.showForm = true;
  }

  editItem(item: DataItem): void {
    this.isEditing = true;
    this.currentItem = { ...item };
    this.showForm = true;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(i => i['id'] !== id);
    if (this.selectedTable) {
      this.testData[this.selectedTable.name] = this.items;
    }
  }

  saveItem(): void {
    if (this.isEditing) {
      const index = this.items.findIndex(i => i['id'] === this.currentItem['id']);
      if (index !== -1) this.items[index] = { ...this.currentItem };
    } else {
      this.currentItem['id'] = this.nextId++;
      this.items = [...this.items, { ...this.currentItem }];
    }
    if (this.selectedTable) {
      this.testData[this.selectedTable.name] = this.items;
    }
    this.cancelForm();
  }

  cancelForm(): void {
    this.showForm = false;
    this.currentItem = {};
    this.isEditing = false;
  }
}
