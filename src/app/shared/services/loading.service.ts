// src/app/shared/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  private hideTimeout: any;

  show(): void {
    clearTimeout(this.hideTimeout); // cancela hide previo si hay
    this._loading.next(true);
  }

  hide(): void {
    this.hideTimeout = setTimeout(() => {
      this._loading.next(false);
    }, 300);
  }
}
