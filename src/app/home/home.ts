import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { Data } from '../data';
import { Artist } from '../artist.interface';
import { Search } from '../search/search';
import { ArtistComponent } from '../artist/artist';

@Component({
  selector: 'app-home',
  imports: [Search, ArtistComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  artists: Artist[] = [];
  topArtists: any[] = [];
  hasSearched: boolean = false;

  private searchSubject = new Subject<string>()

  constructor(private data: Data, private router: Router) {}

  ngOnInit(): void {
    this.data.getTopArtists().subscribe(artists => {
      this.topArtists = artists;
    });

    this.searchSubject.pipe(
      switchMap(query => this.data.searchArtists(query))
    ).subscribe(artists => this.artists = artists)
  }

  onSearch(query: string): void {
    this.hasSearched = true;
    this.searchSubject.next(query)
  }

  onArtistSelected(id: string): void {
    this.router.navigate(['/artist', id]);
  }
}