import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.css'
})
export class ArtistComponent implements OnInit {
  @Input() artist: any
  @Output() eventOut = new EventEmitter<string>()

  constructor() { }
  ngOnInit(): void { }

  onClick() {
    this.eventOut.emit(this.artist.name)
  }

  ngOnDestroy(): void { }
}
