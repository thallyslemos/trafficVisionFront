import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<any>(null);

  isOpen$ = this._isOpen.asObservable();
  data$ = this._data.asObservable();

  open(data: any) {
    this._data.next(data);
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
    this._data.next(null);
  }
}
