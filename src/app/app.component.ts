import { ChangeDetectionStrategy, Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { CounterData, TestComponent } from './test/test.component';
import { GlobalStore } from './ngrx-signals/global.store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { NavigationComponent } from './material/navigation/navigation.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    NavigationComponent,
    MatRadioGroup,
    FormsModule,
    MatRadioButton,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  userId = inject(GlobalStore).userId;

  counter: CounterData = {count: 999};
  modelCounter: CounterData = {count: 1};

  testComponent: Signal<TestComponent> = viewChild.required(TestComponent, {});
  saveButton: Signal<ElementRef<HTMLButtonElement>> = viewChild.required<ElementRef<HTMLButtonElement>>('save');

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    console.log(Breakpoints)
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  density: number = 0;
  seasons: number[] = [
    -4, -3, -2, -1, 0
  ];
}
