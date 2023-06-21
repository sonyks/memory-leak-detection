import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  combineLatest,
  interval,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showBanner = true;
  constructor() {}

  destroyBanner(): void {
    this.showBanner = !this.showBanner;
  }
}
