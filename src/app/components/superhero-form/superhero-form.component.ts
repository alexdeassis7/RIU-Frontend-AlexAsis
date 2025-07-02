import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero } from '../../models/superhero.model';
import { noNumbersValidator } from '../../validators/no-numbers.validator';
import { MaterialModule } from '../../shared/modules/material.module';
import { UppercaseDirective } from '../../shared/directives/uppercase.directive';

@Component({
  selector: 'app-superhero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule, UppercaseDirective],
  templateUrl: './superhero-form.component.html',
})
export class SuperheroFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  heroId: number | null = null;
  heroImageUrl: string | null = null;

  readonly defaultImage =
    'https://us.123rf.com/450wm/belopoppa/belopoppa1809/belopoppa180900002/109693900-imagen-de-marcador-de-posici%C3%B3n-de-perfil-silueta-gris-sin-foto-de-una-persona-en-el-avatar-la.jpg?ver=6';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private heroService: SuperHeroService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), noNumbersValidator]],
      power: ['', [Validators.required, Validators.minLength(2), noNumbersValidator]],
      origin: [''],
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.editMode = true;
        this.heroId = +idParam;

        const hero = this.heroService.getById(this.heroId);
        if (hero) {
          this.form.patchValue(hero);
          this.heroImageUrl = hero.imageUrl || this.defaultImage;
        }
      } else {
        this.heroImageUrl = this.defaultImage;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValues = this.form.value;

    if (this.editMode && this.heroId !== null) {
      const existingHero = this.heroService.getById(this.heroId);
      if (!existingHero) return;

      const updatedHero: SuperHero = {
        ...existingHero,
        name: formValues.name,
        power: formValues.power,
      };

      this.heroService.update(updatedHero);
      this.snackBar.open('Héroe actualizado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });
    } else {
      const newHero: SuperHero = {
        id: 0,
        ...formValues,
        imageUrl: this.heroImageUrl!
      };

      this.heroService.add(newHero);
      this.snackBar.open('Héroe creado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });
    }

    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
