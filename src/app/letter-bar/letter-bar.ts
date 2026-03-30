import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-letter-bar',
  imports: [RouterLink],
  templateUrl: './letter-bar.html',
  styleUrl: './letter-bar.css'
})
export class LetterBar {
  letters: Array<string> = []

  ngOnInit(): void {
    for (let i = 0; i < 26; i++) {
      this.letters.push(String.fromCharCode(i + 65))
    }
  }
}