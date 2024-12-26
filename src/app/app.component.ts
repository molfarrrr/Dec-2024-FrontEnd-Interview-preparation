import { ChangeDetectionStrategy, Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterData, TestComponent } from './test/test.component';
import { GlobalStore } from './ngrx-signals/global.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  userId = inject(GlobalStore).userId;

  counter: CounterData = {count: 999};
  modelCounter: CounterData = {count: 1};

  testComponent: Signal<TestComponent> = viewChild.required(TestComponent, {});
  saveButton: Signal<ElementRef<HTMLButtonElement>> = viewChild.required<ElementRef<HTMLButtonElement>>('save');
}
