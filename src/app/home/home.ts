import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data';
import { LetterBar } from '../letter-bar/letter-bar';
import { Search } from '../search/search';
import { ArtistComponent } from '../artist/artist';

@Component({
  selector: 'app-home',
  imports: [LetterBar, Search, ArtistComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  artists: any[] = [];
  hasSearched: boolean = false;

  constructor(private data: Data, private router: Router) {}

  onSearch(query: string): void {
    this.hasSearched = true;
    this.data.searchArtists(query).subscribe(artists => {
      this.artists = artists;
    });
  }

onArtistSelected(idArtist: string): void {
  this.router.navigate(['/artist', idArtist]);
 }
}