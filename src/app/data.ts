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
    return this.http.get<any>(`/api/artist/${encodeURIComponent(artistId)}/albums`)
      .pipe(map(res => (res.data ?? []).map((album: any): Album => ({
        id: album.id.toString(),
        name: album.title,
        image: album.cover_xl || album.cover_medium || '',
        release_date: album.release_date || ''
      }))))
  }

  getAlbumById(albumId: string): Observable<Album> {
    return this.http.get<any>(`/api/album/${encodeURIComponent(albumId)}`)
      .pipe(map(res => ({
        id: res.id.toString(),
        name: res.title,
        image: res.cover_xl || res.cover_medium || '',
        release_date: res.release_date || ''
      })))
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

  getTopArtists(): Observable<any[]> {
    return this.http.get<any>('/api/chart/0/artists?limit=10')
      .pipe(map(res => (res.data ?? []).map((a: any) => ({
        id: a.id.toString(),
        name: a.name,
        image: a.picture_xl || a.picture_medium || '',
        followers: a.nb_fan,
        genres: ''
      }))))
  }

  getTopAlbums(): Observable<Album[]> {
    return this.http.get<any>('/api/chart/0/albums?limit=10')
      .pipe(map(res => (res.data ?? []).map((a: any): Album => ({
        id: a.id.toString(),
        name: a.title,
        image: a.cover_xl || a.cover_medium || '',
        release_date: a.release_date || ''
      }))))
  }
}