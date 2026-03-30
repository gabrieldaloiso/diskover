import { Component } from '@angular/core';

@Component({
  selector: 'app-track-list',
<<<<<<< HEAD
  imports: [],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {

=======
  standalone: true,
  imports: [],
  template: `<p>track-list works</p>`
})
export class TrackList {

  constructor() { }
>>>>>>> fe373df74c247f1cec20778fe2aa639f9fa6e4e9
}
