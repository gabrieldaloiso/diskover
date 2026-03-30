import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  @Output() onFilter = new EventEmitter<string>()

  formGroup: FormGroup
  searchCtrl: FormControl

  constructor() {
    this.searchCtrl = new FormControl('', { validators: [Validators.required, Validators.minLength(2)], nonNullable: true })
    this.formGroup = new FormGroup({
      searchCtrl: this.searchCtrl
    })
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(
      filter((val: string) => val.length >= 2),
      debounceTime(500)
    ).subscribe((val: string) => this.onFilter.emit(val.trim()))
  }

  onSub(): void {
    if (this.formGroup.invalid) return
    this.onFilter.emit(this.searchCtrl.value.trim())
  }
}