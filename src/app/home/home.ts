import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject, switchMap } from 'rxjs';
import { Data } from '../data';
import { Artist } from '../artist.interface';
import { Album } from '../album.interface';
import { Track } from '../track.interface';
import { Search } from '../search/search';
import { ArtistComponent } from '../artist/artist';
import { AlbumComponent } from '../album/album';

@Component({
  selector: 'app-home',
  imports: [Search, ArtistComponent, AlbumComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  topArtists: any[] = [];
  topAlbums: Album[] = [];
  hasSearched: boolean = false;

  private searchSubject = new Subject<string>()

  constructor(private data: Data, private router: Router) {}

  ngOnInit(): void {
    this.data.getTopArtists().subscribe(artists => {
      this.topArtists = artists;
    });

    this.data.getTopAlbums().subscribe(albums => {
      this.topAlbums = albums;
    });

    this.searchSubject.pipe(
      switchMap(query => forkJoin({
        artists: this.data.searchArtists(query),
        albums: this.data.searchAlbums(query),
        tracks: this.data.searchTracks(query)
      }))
    ).subscribe(({ artists, albums, tracks }) => {
      this.artists = artists;
      this.albums = albums;
      this.tracks = tracks;
    })
  }

  onSearch(query: string): void {
    this.hasSearched = true;
    this.searchSubject.next(query)
  }

  onArtistSelected(id: string): void {
    this.router.navigate(['/artist', id]);
  }

  formatDuration(ms: number): string {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    return Math.floor(totalSeconds / 60) + ':' + String(totalSeconds % 60).padStart(2, '0');
  }
}