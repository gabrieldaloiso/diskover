import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Data } from '../data'; 
import { Track } from '../track.interface';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList implements OnInit {
  tracks: Track[] = [];

  goBack() {
    window.history.back();
  }
  private route = inject(ActivatedRoute);
  private dataService = inject(Data);

  ngOnInit() {
    // 1. On récupère l'ID de l'ALBUM dans l'URL
    const idAlbum = this.route.snapshot.paramMap.get('id');
    
    if (idAlbum) {
      // 2. On appelle la méthode pour les tracks
      this.dataService.getTracksByAlbum(idAlbum).subscribe((res: Track[]) => {
        this.tracks = res;
      });
    }
  }
}