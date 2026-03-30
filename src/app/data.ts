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

  constructor(private http: HttpClient) { }

  searchArtists(name: string): Observable<Artist[]> {
    return this.http.get<any>(`/api/search/artist?q=${encodeURIComponent(name)}`)
      .pipe(map(res => (res.data ?? []).map((a: any): Artist => ({
        id: a.id.toString(),
        name: a.name,
        image: a.picture_xl || a.picture_medium || '',
        followers: a.nb_fan,
        genres: ''
      }))))
  }

  searchArtistsByLetter(letter: string): Observable<Artist[]> {
    return this.searchArtists(letter)
  }

  getAlbumsByArtist(artistId: string): Observable<Album[]> {
    return this.http.get<any>(`/api/artist/${encodeURIComponent(artistId)}/top?limit=50`)
      .pipe(map(res => (res.data ?? []).map((item: any): Album => ({
        id: item.album.id.toString(),
        name: item.album.title,
        image: item.album.cover_xl || item.album.cover_medium || '',
        release_date: item.album.release_date || ''
      }))))
  }

  getTracksByAlbum(albumId: string): Observable<Track[]> {
    return this.http.get<any>(`/api/album/${encodeURIComponent(albumId)}`)
      .pipe(map(res => (res.tracks?.data ?? []).map((t: any): Track => ({
        id: t.id.toString(),
        name: t.title,
        duration_ms: t.duration * 1000,
        preview_url: t.preview
      }))))
  }
}
