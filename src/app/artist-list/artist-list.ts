import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';
import { ArtistComponent } from '../artist/artist';
import { LetterBar } from '../letter-bar/letter-bar';

@Component({
  selector: 'app-artist-list',
  imports: [ArtistComponent, LetterBar],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css'
})
export class ArtistList implements OnInit {
  artists: any[] = [];

  constructor(
    private data: Data,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.data.searchArtistsByLetter(params['letter']).subscribe(artists => {
        this.artists = artists;
      });
    });
  }

  onArtistSelected(idArtist: string): void {
  this.router.navigate(['/artist', idArtist]);
  }
}