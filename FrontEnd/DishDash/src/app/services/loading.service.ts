import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSubject_1 = new Subject<number>();

  private loadingSubject = new BehaviorSubject<number>(0);
  
  loading$ = this.loadingSubject.asObservable();

  setLoading(value: number) {
    this.loadingSubject.next(value);
    this.loadingSubject_1.next(value);
  }
}
