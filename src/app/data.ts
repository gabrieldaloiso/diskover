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

  private readonly baseUrl: string = '/lastfm/2.0/'
  private apiKey = '2c35ebdaf478240d5e6a0e25f9667324'

  constructor(private http: HttpClient) { }

  searchArtists(name: string): Observable<Artist[]> {
    return this.http.get<any>(
      `${this.baseUrl}?method=artist.search&artist=${encodeURIComponent(name)}&api_key=${this.apiKey}&format=json`
    ).pipe(map(res => {
      const raw = res.results?.artistmatches?.artist ?? []
      const arr = Array.isArray(raw) ? raw : [raw]
      return arr.map((a: any): Artist => ({
        name: a.name,
        mbid: a.mbid,
        url: a.url,
        imageSmall: a.image?.[0]?.['#text'] ?? '',
        imageLarge: a.image?.[2]?.['#text'] ?? ''
      }))
    }))
  }

  searchArtistsByLetter(letter: string): Observable<Artist[]> {
    return this.searchArtists(letter)
  }

  getAlbumsByArtist(artistName: string): Observable<Album[]> {
    return this.http.get<any>(
      `${this.baseUrl}?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${this.apiKey}&format=json&limit=20`
    ).pipe(map(res => {
      if (!res.topalbums?.album) return []
      const raw = res.topalbums.album
      const arr = Array.isArray(raw) ? raw : [raw]
      return arr.map((a: any): Album => ({
        name: a.name,
        mbid: a.mbid,
        url: a.url,
        playcount: a.playcount,
        artistName: a.artist?.name ?? artistName,
        imageLarge: a.image?.[2]?.['#text'] ?? ''
      }))
    }))
  }

  getTracksByAlbum(artistName: string, albumName: string): Observable<Track[]> {
    return this.http.get<any>(
      `${this.baseUrl}?method=album.getinfo&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${this.apiKey}&format=json`
    ).pipe(map(res => {
      if (!res.album?.tracks?.track) return []
      const raw = res.album.tracks.track
      const arr = Array.isArray(raw) ? raw : [raw]
      return arr.map((t: any): Track => ({
        name: t.name,
        duration: t.duration,
        url: t.url,
        rank: t['@attr']?.rank
      }))
    }))
  }
}
