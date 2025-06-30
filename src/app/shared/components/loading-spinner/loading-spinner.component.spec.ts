import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { By } from '@angular/platform-browser';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loading spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mat-spinner', () => {
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should have the overlay container', () => {
    const overlay = fixture.debugElement.query(By.css('.spinner-overlay'));
    expect(overlay).toBeTruthy();
  });
});
