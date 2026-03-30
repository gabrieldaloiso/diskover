import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  @Output() onFilter = new EventEmitter<string>()
  
  formGroup: FormGroup
  searchCtrl: FormControl

  constructor() {
    this.searchCtrl = new FormControl('', { validators: [Validators.minLength(3)], nonNullable: true })
    this.formGroup = new FormGroup({
      searchCtrl: this.searchCtrl
    })
  }

  onSub(): void {
    this.onFilter.emit(this.searchCtrl.value)
  }
}