import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToasdData } from '../models/toast.model ';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<ToasdData>(null);

  isOpen$ = this._isOpen.asObservable();
  data$ = this._data.asObservable();

  open(data: ToasdData) {
    this._data.next(data);
    this._isOpen.next(true);

    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this._isOpen.next(false);
    this._data.next(null);
  }
  constructor() {}
}
