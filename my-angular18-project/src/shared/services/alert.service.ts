import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertInterface } from '../models/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert$ = new Subject<AlertInterface | undefined>();

  setAlert(alert: AlertInterface): void {
    this.alert$.next(alert);
    setTimeout(() => {
      this.alert$.next(undefined);
    }, 3000);
  }

  getAlert(): Observable<AlertInterface | undefined> {
    return this.alert$.asObservable();
  }
}
