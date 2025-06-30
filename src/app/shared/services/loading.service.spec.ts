import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { take } from 'rxjs/operators';
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show is called', (done) => {
    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeFalse();
    });

    service.show();

    service.loading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should emit false after 300ms when hide is called', fakeAsync(() => {
    service.show();
    tick();

    service.hide();
    let current: boolean | undefined;

    service.loading$.subscribe(value => current = value);

    tick(299);
    expect(current).toBeTrue(); 

    tick(1); 
    expect(current).toBeFalse(); 
  }));

});
