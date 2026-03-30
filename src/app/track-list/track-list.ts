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
    const artistName = this.route.snapshot.paramMap.get('artist');
    const albumName = this.route.snapshot.paramMap.get('album');

    if (artistName && albumName) {
      this.dataService.getTracksByAlbum(artistName, albumName).subscribe((res: Track[]) => {
        this.tracks = res;
      });
    }
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '0:00';
    return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
  }
}
