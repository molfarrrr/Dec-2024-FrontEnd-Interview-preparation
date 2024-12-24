import {
  ChangeDetectionStrategy,
  Component, computed,
  input, InputSignal, model, ModelSignal,
  OnChanges,
  output,
  OutputEmitterRef,
  signal,
  SimpleChanges, untracked, WritableSignal
} from '@angular/core';

export interface CounterData {
  count: number
}

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  /*
  * Two-way data binding as separate input-output properties definition
  * */
  counter: InputSignal<CounterData> = input({count: 0});
  counterChange: OutputEmitterRef<CounterData> = output();

  /*
  * Two-way data binding as model signal
  * */
  modelCounter: ModelSignal<CounterData> = model.required();

  derivedCounter = computed(() => {
    console.log('computed counter change');
    return this.counter().count;
  });

  list = signal([
    "Hello",
    "World"
  ]);

  object = signal({
    id: 1,
    title: "Angular For Beginners"
  });

  constructor() {
    // DO NOT DO THIS !!!!!!!!!
    // Use set/update functions all the time
    // this.list().push("Again");
    // this.object().title = "overwriting title";

    // Do this instead
    this.list.update(x => [...x, '!']);
    this.object.update(x => ({...x, title: 'New Title'}))
  }

  increment() {
    console.log('immutable counter increment');
    this.counterChange.emit({count: this.counter().count + 1})
  }

  incrementModelCounter() {
    console.log('model counter increment');
    this.modelCounter.update(x => ({...x, count: x.count + 1}));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges triggered');
  }

  /*
  * Mutable change of the signal will not trigger computed signals that depend on the one changed
  * Do not trigger ngOnChanges either
  * Trigger the view update for some reason though
  * */
  incrementMutate() {
    console.log('mutable counter increment');
    const counter = this.counter();
    counter.count += 1;

    this.counterChange.emit(counter);
  }
}
