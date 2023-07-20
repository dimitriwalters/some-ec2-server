import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
  <button (click)="count = count + 1">+1</button> {{ count }} <button (click)="count = count - 1">-1</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  count = 0;
}
