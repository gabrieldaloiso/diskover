import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
<<<<<<< HEAD
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

=======
  standalone: true,
  imports: [],
  template: `<p>about works</p>`
})
export class About {

  constructor() { }
>>>>>>> fe373df74c247f1cec20778fe2aa639f9fa6e4e9
}
