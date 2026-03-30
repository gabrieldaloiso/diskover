import { Component } from '@angular/core';

@Component({
  selector: 'app-album-list',
<<<<<<< HEAD
  imports: [],
  templateUrl: './album-list.html',
  styleUrl: './album-list.css',
})
export class AlbumList {

=======
  standalone: true,
  imports: [],
  template: `<p>album-list works</p>`
})
export class AlbumList {

  constructor() { }
>>>>>>> fe373df74c247f1cec20778fe2aa639f9fa6e4e9
}
