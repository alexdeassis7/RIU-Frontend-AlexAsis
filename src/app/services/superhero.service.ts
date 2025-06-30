import { Injectable, computed, effect, signal } from '@angular/core';
import { SuperHero } from '../models/superhero.model';

@Injectable({ providedIn: 'root' })
export class SuperHeroService {
  private readonly _heroes = signal<SuperHero[]>(this.initialHeroes());
  readonly heroes = computed(() => this._heroes());

  constructor() {
    effect(() => {
      console.debug('[HeroService] Cantidad de héroes:', this.heroes().length);
    });
  }

  getById(id: number): SuperHero | undefined {
    return this._heroes().find(hero => hero.id === id);
  }

  add(newHero: SuperHero): void {
    const exists = this._heroes().some(h =>
      h.name.trim().toLowerCase() === newHero.name.trim().toLowerCase() &&
      h.power.trim().toLowerCase() === newHero.power.trim().toLowerCase() &&
      h.imageUrl === newHero.imageUrl
    );

    if (exists) {
      console.warn('Ya existe un héroe con los mismos datos. No se agrega.');
      return;
    }

    const nextId = Math.max(0, ...this._heroes().map(h => h.id)) + 1;
    const heroWithId = { ...newHero, id: nextId };
    this._heroes.update(current => [...current, heroWithId]);
  }

  update(updatedHero: SuperHero): void {
    this._heroes.update(current =>
      current.map(hero => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  }

  delete(id: number): void {
    this._heroes.update(current => current.filter(hero => hero.id !== id));
  }

  searchByName(query: string): SuperHero[] {
    const lower = query.toLowerCase();
    return this._heroes().filter(hero => hero.name.toLowerCase().includes(lower));
  }

  private initialHeroes(): SuperHero[] {
    return [
      { id: 1, name: 'Spiderman', power: 'Agilidad', imageUrl: this.img(620, 'spider-man') },
      { id: 2, name: 'Ironman', power: 'Tecnología', imageUrl: this.img(346, 'iron-man') },
      { id: 3, name: 'Batman', power: 'Estrategia y gadgets', imageUrl: this.img(70, 'batman') },
      { id: 4, name: 'Superman', power: 'Fuerza, vuelo y visión láser', imageUrl: this.img(644, 'superman') },
      { id: 5, name: 'Wonder Woman', power: 'Fuerza y lazo de la verdad', imageUrl: this.img(720, 'wonder-woman') },
      { id: 6, name: 'Flash', power: 'Velocidad sobrehumana', imageUrl: this.img(263, 'flash') },
      { id: 7, name: 'Captain America', power: 'Fuerza, escudo vibranium', imageUrl: this.img(149, 'captain-america') },
      { id: 8, name: 'Thor', power: 'Poder de los dioses y martillo Mjolnir', imageUrl: this.img(659, 'thor') },
      { id: 9, name: 'Hulk', power: 'Fuerza descomunal', imageUrl: this.img(332, 'hulk') },
      { id: 10, name: 'Black Panther', power: 'Agilidad, traje vibranium', imageUrl: this.img(106, 'black-panther') },
      { id: 11, name: 'Doctor Strange', power: 'Magia y manipulación del tiempo', imageUrl: this.img(226, 'doctor-strange') },
      { id: 12, name: 'Scarlet Witch', power: 'Magia del caos y telequinesis', imageUrl: this.img(579, 'scarlet-witch') },
      { id: 13, name: 'Wolverine', power: 'Regeneración y garras de adamantium', imageUrl: this.img(717, 'wolverine') },
      { id: 14, name: 'Deadpool', power: 'Regeneración, combate cuerpo a cuerpo', imageUrl: this.img(213, 'deadpool') },
      { id: 16, name: 'Aquaman', power: 'Control del agua y comunicación marina', imageUrl: this.img(38, 'aquaman') },
      { id: 17, name: 'Cyborg', power: 'Tecnología y fuerza', imageUrl: this.img(194, 'cyborg') },
      { id: 19, name: 'Ant-Man', power: 'Cambio de tamaño y control de hormigas', imageUrl: this.img(30, 'ant-man') },
      { id: 20, name: 'Captain Marvel', power: 'Energía cósmica y vuelo', imageUrl: this.img(156, 'captain-marvel') },
      { id: 21, name: 'Hawkeye', power: 'Puntería perfecta', imageUrl: this.img(313, 'hawkeye') },
      { id: 22, name: 'Black Widow', power: 'Espionaje y combate', imageUrl: this.img(107, 'black-widow') },
      { id: 23, name: 'Vision', power: 'Energía y densidad variable', imageUrl: this.img(370, 'vision') },
    ];
  }

  private img(id: number, slug: string): string {
    return `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/${id}-${slug}.jpg`;
  }
}
