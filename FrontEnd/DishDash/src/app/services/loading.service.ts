import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new Subject<number>();
  readonly loading$ = this._loading.asObservable();

  setLoading(progress:number) {
    this._loading.next(progress);
  }

  constructor() { }
}
