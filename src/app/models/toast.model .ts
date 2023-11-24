export type ToastType = 'success' | 'error' | 'warning';
export type ToasdData = {
  type: ToastType;
  message: string;
} | null;
