import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Artist } from '../artist.interface';
import { Data } from '../data';

@Component({
  selector: 'app-auto-complete',
  imports: [ReactiveFormsModule],
  templateUrl: './auto-complete.html',
  styleUrl: './auto-complete.css',
})
export class AutoComplete implements OnInit {

  suggestions: Artist[] = []

  formGroup: FormGroup
  searchControl: FormControl<string>

  constructor(private dataService: Data) {
    this.searchControl = new FormControl('', { nonNullable: true })
    this.formGroup = new FormGroup({
      search: this.searchControl
    })
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      filter(chaine => chaine.length >= 2),
      debounceTime(1000),
      switchMap(chaine => this.dataService.searchArtists(chaine))
    ).subscribe(
      (artists: Artist[]) => this.suggestions = artists
    )
  }

}
