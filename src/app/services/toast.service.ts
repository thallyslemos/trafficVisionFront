import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ToasdData } from '../models/toast.model ';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<ToasdData>(null);
  private _closeSubscription: Subscription | null = null;

  isOpen$ = this._isOpen.asObservable();
  data$ = this._data.asObservable();

  open(data: ToasdData) {
    this._data.next(data);
    this._isOpen.next(true);

    // Cancela a subscrição anterior
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
    }

    // Inicia um novo intervalo
    this._closeSubscription = of(null)
      .pipe(delay(3000))
      .subscribe(() => this.close());
  }

  close() {
    this._isOpen.next(false);
    this._data.next(null);

    // Limpa o intervalo
    if (this._closeSubscription) {
      this._closeSubscription.unsubscribe();
      this._closeSubscription = null;
    }
  }
  constructor() {}
}
