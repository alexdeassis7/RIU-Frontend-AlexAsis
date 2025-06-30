import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SuperHeroService } from '../../services/superhero.service';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperheroListComponent } from '../superhero-list/superhero-list.component';

const mockHeroes = [
  { id: 1, name: 'Superman', power: 'Volar', imageUrl: 'url1' },
  { id: 2, name: 'Batman', power: 'Inteligencia', imageUrl: 'url2' },
  { id: 3, name: 'Flash', power: 'Velocidad', imageUrl: 'url3' },
];

describe('SuperheroListComponent (simple)', () => {
  let component: SuperheroListComponent;
  let fixture: ComponentFixture<SuperheroListComponent>;
  let heroServiceSpy: jasmine.SpyObj<SuperHeroService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('SuperHeroService', ['heroes', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SuperheroListComponent],
      providers: [
        { provide: SuperHeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { heroes: mockHeroes } },
          },
        },
        {
          provide: MatSnackBar,
          useValue: { open: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los héroes correctamente', () => {
    expect(component.displayedHeroes.length).toBe(3);
  });

  it('debería filtrar por nombre correctamente', fakeAsync(() => {
    component.filterText = 'bat';
    component.applyFilter();
    tick();
    expect(component.displayedHeroes.length).toBe(1);
    expect(component.displayedHeroes[0].name).toBe('Batman');
  }));

  it('debería navegar al agregar héroe', () => {
    component.add();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('debería navegar al editar héroe', () => {
    component.edit(3);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit', 3]);
  });

  it('debería calcular las páginas totales', () => {
    component.pageSize = 2;
    expect(component.totalPages).toBe(2);
  });

  it('debería marcar imagen como cargada', () => {
    component.onImageLoad(1);
    expect(component.imagesLoaded[1]).toBeTrue();
  });
});
