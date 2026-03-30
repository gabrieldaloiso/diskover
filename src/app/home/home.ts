import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
<<<<<<< HEAD
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

=======
  standalone: true,
  imports: [],
  template: `<p>home works</p>`
})
export class Home {

  constructor() { }
>>>>>>> fe373df74c247f1cec20778fe2aa639f9fa6e4e9
}
