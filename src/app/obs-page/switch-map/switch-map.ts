import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { Artist } from '../../artist.interface';
import { Album } from '../../album.interface';
import { Data } from '../../data';

@Component({
  selector: 'app-switch-map',
  imports: [ReactiveFormsModule],
  templateUrl: './switch-map.html',
  styleUrl: './switch-map.css'
})
export class SwitchMap implements OnInit {

  foundArtist: Artist | null = null
  albums: Album[] = []

  formGroup: FormGroup
  artistCtrl: FormControl<string>

  constructor(private dataService: Data) {
    this.artistCtrl = new FormControl<string>('', { nonNullable: true })
    this.formGroup = new FormGroup({ artist: this.artistCtrl })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const name = this.artistCtrl.value.trim()
    this.foundArtist = null
    this.albums = []

    this.dataService.searchArtists(name).pipe(
      switchMap(artists => {
        if (!artists || !artists.length) return of([])
        this.foundArtist = artists[0]
        return this.dataService.getAlbumsByArtist(artists[0].id)
      })
    ).subscribe((albums: Album[]) => this.albums = albums)
  }
}
