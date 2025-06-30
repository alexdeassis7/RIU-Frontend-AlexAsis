import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero } from '../../models/superhero.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialog } from '../../shared/modal/delete-confirmation.dialog';
import { UppercaseDirective } from '../../shared/directives/uppercase.directive';

@Component({
  selector: 'app-superhero-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    UppercaseDirective
  ],
  templateUrl: './superhero-list.component.html',
  styleUrls: ['./superhero-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class SuperheroListComponent implements OnInit {
  filterText = '';
  page = 1;
  pageSize = 6;
  imagesLoaded: Record<number, boolean> = {};
  isLoadingPage = true;

  displayedHeroes: SuperHero[] = [];
  private allHeroes: SuperHero[] = [];

  constructor(
    private heroService: SuperHeroService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['heroes'] as SuperHero[];
    this.allHeroes = resolvedData ?? this.heroService.heroes();
    this.updateDisplayedHeroes();
  }

  private updateDisplayedHeroes(): void {
    const filtered = this.allHeroes.filter(h =>
      h.name.toLowerCase().includes(this.filterText.toLowerCase())
    );

    const maxPage = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    if (this.page > maxPage) {
      this.page = maxPage;
    }

    const start = (this.page - 1) * this.pageSize;
    this.displayedHeroes = filtered.slice(start, start + this.pageSize);

    this.isLoadingPage = false;
  }

  applyFilter(): void {
    this.page = 1;
    this.showSpinnerAndUpdate();
  }

  clearFilter(): void {
    this.filterText = '';
    this.applyFilter();
  }

  onImageLoad(id: number): void {
    this.imagesLoaded[id] = true;
  }

  delete(id: number): void {
    const hero = this.displayedHeroes.find(h => h.id === id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      data: { name: hero?.name || 'este héroe' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.delete(id);
        this.allHeroes = this.heroService.heroes();
        this.showSpinnerAndUpdate();

        this.snackBar.open(`${hero?.name || 'El héroe'} fue eliminado correctamente`, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  add(): void {
    this.router.navigate(['/add']);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.showSpinnerAndUpdate();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.showSpinnerAndUpdate();
    }
  }

  private showSpinnerAndUpdate(): void {
    this.isLoadingPage = true;
    setTimeout(() => {
      this.updateDisplayedHeroes();
    }, 0);
  }

  get totalPages(): number {
    const filteredLength = this.allHeroes.filter(h =>
      h.name.toLowerCase().includes(this.filterText.toLowerCase())
    ).length;
    return Math.ceil(filteredLength / this.pageSize);
  }

  trackByHeroId(index: number, hero: SuperHero): number {
    return hero.id;
  }
}
