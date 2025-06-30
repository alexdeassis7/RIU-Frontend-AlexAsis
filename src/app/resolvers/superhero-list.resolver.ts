import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SuperHero } from '../models/superhero.model';
import { SuperHeroService } from '../services/superhero.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SuperheroListResolver implements Resolve<SuperHero[]> {
  constructor(private heroService: SuperHeroService) {}

  resolve(): Observable<SuperHero[]> {
    return of(this.heroService.heroes());
  }
}
