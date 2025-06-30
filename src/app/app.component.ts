import { Component, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from './shared/services/loading.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  isLoading = false;

  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.ngZone.run(() => {
        this.isLoading = loading;
        this.cdRef.detectChanges();
      });
    });
  }
}
