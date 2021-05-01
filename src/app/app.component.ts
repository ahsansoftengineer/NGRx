import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Resturant';
  public myForm: FormGroup;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      results: new FormControl(['', Validators.required]),
    });
  }
}
