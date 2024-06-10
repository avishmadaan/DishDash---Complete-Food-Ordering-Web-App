import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSubject_1 = new Subject<number>();


  setLoading(value:number) {
    this.loadingSubject_1.next(value);
  }
}
