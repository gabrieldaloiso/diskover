import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Data } from '../data';
import { Album } from '../album.interface';
import { AlbumComponent } from '../album/album';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, AlbumComponent],
  templateUrl: './album-list.html',
  styleUrl: './album-list.css',
})
export class AlbumList implements OnInit {
  albums: Album[] = [];

  private route = inject(ActivatedRoute);
  private dataService = inject(Data);

  ngOnInit() {
    const artistId = this.route.snapshot.paramMap.get('id');

    if (artistId) {
      this.dataService.getAlbumsByArtist(artistId).subscribe((res: Album[]) => {
        this.albums = res;
      });
    }
  }
}
