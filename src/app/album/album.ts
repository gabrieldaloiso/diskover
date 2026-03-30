import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from '../album.interface'; 
@Component({
  selector: 'app-album',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './album.html',
  styleUrl: './album.css',
})
export class AlbumComponent {
  @Input() album!: Album; 
}