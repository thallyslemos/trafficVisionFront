import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ToasdData,
  ToastService,
  ToastType,
} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  isOpen$ = this.toastService.isOpen$;
  data$ = this.toastService.data$;
  toastData: ToasdData = null;

  constructor(private toastService: ToastService) {}

  close() {
    this.toastService.close();
  }

  ngOnInit() {
    this.data$.subscribe((data) => {
      if (data) {
        this.toastService.open(data);
        this.toastData = data;
      }
    });
  }
}
