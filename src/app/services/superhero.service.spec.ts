import { TestBed } from '@angular/core/testing';
import { SuperHeroService } from './superhero.service';
import { SuperHero } from '../models/superhero.model';

describe('SuperHeroService', () => {
  let service: SuperHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes initially', () => {
    const heroes = service.heroes();
    expect(heroes.length).toBeGreaterThan(0);
  });

  it('should return hero by id', () => {
    const hero = service.getById(1);
    expect(hero).toBeTruthy();
    expect(hero?.id).toBe(1);
  });

  it('should add a new hero', () => {
    const newHero: SuperHero = {
      id: 0,
      name: 'Test Hero',
      power: 'Testing',
      imageUrl: 'url-test'
    };

    service.add(newHero);
    const found = service.heroes().find(h => h.name === 'Test Hero');
    expect(found).toBeTruthy();
    expect(found?.id).toBeGreaterThan(0);
  });

  it('should not add duplicate hero', () => {
    const initialLength = service.heroes().length;

    const duplicateHero: SuperHero = {
      id: 999,
      name: 'Spiderman',
      power: 'Agilidad',
      imageUrl: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg',
    };

    service.add(duplicateHero);
    expect(service.heroes().length).toBe(initialLength);
  });

  it('should update an existing hero', () => {
    const hero = service.getById(1);
    expect(hero).toBeTruthy();

    const updated = { ...hero!, name: 'Spiderman V2' };
    service.update(updated);

    const after = service.getById(1);
    expect(after?.name).toBe('Spiderman V2');
  });

  it('should delete a hero', () => {
    const newHero: SuperHero = {
      id: 0,
      name: 'Temp Hero',
      power: 'Temporal',
      imageUrl: 'temp-url',
    };
    service.add(newHero);

    const added = service.heroes().find(h => h.name === 'Temp Hero');
    expect(added).toBeTruthy();

    service.delete(added!.id);
    const exists = service.heroes().find(h => h.id === added!.id);
    expect(exists).toBeFalsy();
  });

  it('should search heroes by name', () => {
    const result = service.searchByName('man');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(h => h.name.toLowerCase().includes('man'))).toBeTrue();
  });
});
