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
    const albumId = this.route.snapshot.paramMap.get('id');

    if (albumId) {
      this.dataService.getTracksByAlbum(albumId).subscribe((res: Track[]) => {
        this.tracks = res;
      });
    }
  }

  formatDuration(ms: number): string {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    return Math.floor(totalSeconds / 60) + ':' + String(totalSeconds % 60).padStart(2, '0');
  }
}
