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

  private readonly baseUrl: string = '/api/v1/json/123'

  constructor(private http: HttpClient) { }

  searchArtists(name: string): Observable<Artist[]> {
    return this.http.get<{ artists: Artist[] | null }>(`${this.baseUrl}/search.php?s=${encodeURIComponent(name)}`)
      .pipe(map(res => res.artists ?? []))
  }

  searchArtistsByLetter(letter: string): Observable<Artist[]> {
    return this.http.get<{ artists: Artist[] | null }>(`${this.baseUrl}/search.php?s=${encodeURIComponent(letter)}`)
      .pipe(map(res => res.artists ?? []))
  }

  getAlbumsByArtist(idArtist: string): Observable<Album[]> {
    return this.http.get<{ album: Album[] | Album | null }>(`${this.baseUrl}/album.php?i=${encodeURIComponent(idArtist)}`)
      .pipe(map(res => {
        if (!res.album) return []
        return Array.isArray(res.album) ? res.album : [res.album]
      }))
  }

  getTracksByAlbum(idAlbum: string): Observable<Track[]> {
    return this.http.get<{ track: Track[] | Track | null }>(`${this.baseUrl}/track.php?m=${encodeURIComponent(idAlbum)}`)
      .pipe(map(res => {
        if (!res.track) return []
        return Array.isArray(res.track) ? res.track : [res.track]
      }))
  }
}
