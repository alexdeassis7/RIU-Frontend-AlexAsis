import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MissingHeroComponent } from './missing-hero.component';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

describe('MissingHeroComponent', () => {
  let component: MissingHeroComponent;
  let fixture: ComponentFixture<MissingHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingHeroComponent, RouterTestingModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MissingHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje "Faltó seleccionar un héroe"', () => {
    const text = fixture.nativeElement.querySelector('h2')?.textContent;
    expect(text).toContain('Faltó seleccionar un héroe');
  });

  it('debería tener un botón que redirige a "/"', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();

    const routerLink = button.attributes['ng-reflect-router-link'];
    expect(routerLink).toBe('/');
  });
});
