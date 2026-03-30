import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Intro } from './intro/intro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Intro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor() { }
}
