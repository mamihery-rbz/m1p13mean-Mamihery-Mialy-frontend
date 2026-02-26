import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProfitRing {
  size: number;
  color: string;
  label: string;
  labelTop: string;
}
@Component({
  selector: 'app-annual-profits-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './annual-profits-admin.component.html',
  styleUrl: './annual-profits-admin.component.css'
})
export class AnnualProfitsAdminComponent {
  selectedYear = 2023;
  years = [2021, 2022, 2023, 2024];

  profitRings: ProfitRing[] = [
    { size: 155, color: '#f9c4b5', label: '14K', labelTop: '8px' },
    { size: 120, color: '#f0927a', label: '9.3K', labelTop: '6px' },
    { size: 90,  color: '#e85d3a', label: '6.8K', labelTop: '8px' },
    { size: 60,  color: '#c94d2e', label: '4K',   labelTop: '16px' },
  ];

  onYearChange(): void {
    // Regenerate profit rings based on selected year
    const factor = this.selectedYear === 2024 ? 1.2
                 : this.selectedYear === 2022 ? 0.85
                 : this.selectedYear === 2021 ? 0.7
                 : 1;

    this.profitRings = [
      { size: 155, color: '#f9c4b5', label: Math.round(14 * factor) + 'K', labelTop: '8px' },
      { size: 120, color: '#f0927a', label: (9.3 * factor).toFixed(1) + 'K', labelTop: '6px' },
      { size: 90,  color: '#e85d3a', label: (6.8 * factor).toFixed(1) + 'K', labelTop: '8px' },
      { size: 60,  color: '#c94d2e', label: Math.round(4  * factor) + 'K',   labelTop: '16px' },
    ];
  }

}
