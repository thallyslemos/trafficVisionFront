import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type ToastType = 'success' | 'error' | 'warning';
export type ToasdData = {
  type: ToastType;
  message: string;
} | null;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _isOpen = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<ToasdData>(null);
  private closeSubscription: Subscription | null = null;

  isOpen$ = this._isOpen.asObservable();
  data$ = this._data.asObservable();

  open(data: ToasdData) {
    this._data.next(data);
    this._isOpen.next(true);

    // Cancela a subscrição anterior
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }

    // Inicia um novo intervalo
    this.closeSubscription = of(null)
      .pipe(delay(5000))
      .subscribe(() => this.close());
  }

  close() {
    this._isOpen.next(false);
    this._data.next(null);

    // Limpa o intervalo
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
      this.closeSubscription = null;
    }
  }
  constructor() {}
}
