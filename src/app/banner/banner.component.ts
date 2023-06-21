import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { PoolingService } from '../pooling.service';
import {
  Subject,
  Subscription,
  combineLatest,
  interval,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  private poolingService = inject(PoolingService);
  private disposed$ = new Subject();
  private subscription = new Subscription(); // approach 4 with @UntilDestroy({ checkProperties: true }). Teardown is done automatically
  destroyRef = inject(DestroyRef);

  constructor() {
    /** approach 5 without destroyRef as dependency **/
    // this.poolingService.poolingInterval$
    //   .pipe(
    //     takeUntilDestroyed(),
    //     switchMap(() => {
    //       return combineLatest([
    //         this.poolingService.getUserInfo$(1),
    //         this.poolingService.getTodoInfo$(1),
    //       ]);
    //     }),
    //     tap(console.log)
    //   )
    //   .subscribe();
  }

  ngOnInit(): void {
    this.subscription = this.poolingService.poolingInterval$
      .pipe(
        //takeUntil(this.disposed$), // approach 1
        //takeUntilDestroyed(this.destroyRef), // approach 2
        untilDestroyed(this, 'destroy'),
        switchMap(() => {
          return combineLatest([
            this.poolingService.getUserInfo$(1),
            this.poolingService.getTodoInfo$(1),
          ]);
          //return interval(1000);
        }),
        tap(console.log),
        takeUntil(this.disposed$) // approach 3
        //shareReplay() /*** approach 4. For the operators such as "finalize", "finally", "shareReplay" etc. takeUntil must be the second last opeartor  ***/
      )
      .subscribe();
  }

  public destroy(): void {}

  // ngOnDestroy(): void {
  //   this.disposed$.next(null);
  //   this.disposed$.complete();
  // }
}
