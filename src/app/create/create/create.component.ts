import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(40)
    ]],
    sentence: ['', [
      Validators.required,
      Validators.maxLength(1000)
    ]],
    types: this.fb.group(
      {
        random: [false],
        noun: [false],
        verb: [false],
        adjective: [false],
        adverb: [false],
        preposition: [false]
      }
    )
  });

  get titleControl(){
    return this.form.get('title') as FormControl
  }

  get sentenceControl(){
    return this.form.get('sentence') as FormControl
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
