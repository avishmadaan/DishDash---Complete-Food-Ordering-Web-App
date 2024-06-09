import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<number>(0);
  loading$ = this.loadingSubject.asObservable();

  setLoading(value: number) {
    this.loadingSubject.next(value);
  }
}
