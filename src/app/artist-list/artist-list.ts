import { Component } from '@angular/core';

@Component({
  selector: 'app-artist-list',
<<<<<<< HEAD
  imports: [],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css',
})
export class ArtistList {

=======
  standalone: true,
  imports: [],
  template: `<p>artist-list works</p>`
})
export class ArtistList {

  constructor() { }
>>>>>>> fe373df74c247f1cec20778fe2aa639f9fa6e4e9
}
