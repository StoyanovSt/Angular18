import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertInterface } from '../models/alert.interface';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class AlertComponent implements OnInit, OnDestroy {
  alert?: AlertInterface;
  private alertService = inject(AlertService);
  private alertSub: Subscription | null = null;

  ngOnInit(): void {
    this.alertSub = this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert;
    });
  }

  ngOnDestroy(): void {
    if (this.alertSub) this.alertSub.unsubscribe();
  }
}
