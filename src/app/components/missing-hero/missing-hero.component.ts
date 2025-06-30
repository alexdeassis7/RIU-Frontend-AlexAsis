import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missing-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <div class="page-container">
      <div class="missing-card">
        <h2>Faltó seleccionar un héroe</h2>
        <button mat-raised-button color="primary" routerLink="/">Volver a la lista</button>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      padding: 20px;
    }

    .missing-card {
      background-color: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      text-align: center;
    }

    h2 {
      margin-bottom: 20px;
    }
  `]
})
export class MissingHeroComponent {}
