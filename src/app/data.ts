import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Artist } from './artist.interface';
import { Album } from './album.interface';
import { Track } from './track.interface';

@Injectable({
  providedIn: 'root'
})
export class Data {

  private readonly baseUrl: string = 'https://www.theaudiodb.com/api/v1/json/123'

  constructor(private http: HttpClient) { }

  searchArtists(name: string): Observable<Artist[]> {
    return this.http.get<{ artists: Artist[] | null }>(`${this.baseUrl}/search.php?s=${name}`)
      .pipe(map(res => res.artists ?? []))
  }

  searchArtistsByLetter(letter: string): Observable<Artist[]> {
    return this.http.get<{ artists: Artist[] | null }>(`${this.baseUrl}/search.php?s=${letter}`)
      .pipe(map(res => res.artists ?? []))
  }

  getAlbumsByArtist(idArtist: string): Observable<Album[]> {
    return this.http.get<{ album: Album[] | null }>(`${this.baseUrl}/album.php?i=${idArtist}`)
      .pipe(map(res => res.album ?? []))
  }

  getTracksByAlbum(idAlbum: string): Observable<Track[]> {
    return this.http.get<{ track: Track[] | null }>(`${this.baseUrl}/track.php?m=${idAlbum}`)
      .pipe(map(res => res.track ?? []))
  }
}
