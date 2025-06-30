import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SuperheroListComponent } from './superhero-list.component';
import { SuperHeroService } from '../../services/superhero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

const mockHeroes = [
  { id: 1, name: 'Superman', power: 'Volar', imageUrl: 'url1' },
  { id: 2, name: 'Batman', power: 'Inteligencia', imageUrl: 'url2' },
  { id: 3, name: 'Flash', power: 'Velocidad', imageUrl: 'url3' },
];

describe('SuperheroListComponent', () => {
  let component: SuperheroListComponent;
  let fixture: ComponentFixture<SuperheroListComponent>;
  let heroServiceSpy: jasmine.SpyObj<SuperHeroService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj('SuperHeroService', ['heroes', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [SuperheroListComponent],
      providers: [
        { provide: SuperHeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { heroes: mockHeroes },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes after init', () => {
    expect(component.displayedHeroes.length).toBe(3);
  });

  it('should filter heroes based on filterText', fakeAsync(() => {
    component.filterText = 'bat';
    component.applyFilter();
    tick();
    expect(component.displayedHeroes.length).toBe(1);
    expect(component.displayedHeroes[0].name).toBe('Batman');
  }));

  it('should navigate to add hero page', () => {
    component.add();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/add']);
  });

  it('should navigate to edit hero page', () => {
    component.edit(2);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit', 2]);
  });

  it('should calculate total pages correctly', () => {
    component.pageSize = 2;
    expect(component.totalPages).toBe(2);
  });

  it('should update image load state', () => {
    component.onImageLoad(1);
    expect(component.imagesLoaded[1]).toBeTrue();
  });

  it('should clear filter text and reload', fakeAsync(() => {
    component.filterText = 'bat';
    component.clearFilter();
    tick();
    expect(component.filterText).toBe('');
    expect(component.page).toBe(1);
    expect(component.displayedHeroes.length).toBeGreaterThan(0);
  }));

  it('should change page correctly', fakeAsync(() => {
    component.pageSize = 1;
    component.nextPage();
    tick();
    expect(component.page).toBe(2);

    component.previousPage();
    tick();
    expect(component.page).toBe(1);
  }));
});