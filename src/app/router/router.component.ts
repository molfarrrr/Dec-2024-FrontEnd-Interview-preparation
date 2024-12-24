import { Component, input } from '@angular/core';

@Component({
  selector: 'app-router',
  imports: [],
  templateUrl: './router.component.html',
  styleUrl: './router.component.css'
})
export class RouterComponent {
  // Gets populated by the router!!!!
  description = input<string>();
  // Populated from the query param!!!!
  customerId = input<string | undefined>(undefined, { alias: 'id' });

  constructor() {
  }
}
