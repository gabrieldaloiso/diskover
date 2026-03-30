import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Communication } from '../communication';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  lastMessage: string = '';

  constructor(private communicationService: Communication) {}

  ngOnInit(): void {
    this.communicationService.onData().subscribe(
      (val: string) => this.lastMessage = val
    );
  }

}
