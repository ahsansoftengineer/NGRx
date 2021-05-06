import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'youtube-update-user',
  template: `
    <form
      [formGroup]="userForm"
      (ngSubmit)="userForm.valid && addOrUpdateUser()"
    >
      <div fxLayout="column" fxLayoutAlign="center start">
        <mat-form-field>
          <input formControlName="name" matInput placeholder="Name" />
          <mat-error>Name is Required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input formControlName="email" matInput placeholder="Email" />
          <mat-error>Email is Required</mat-error>
        </mat-form-field>
        <button type="submit" mat-raised-button color="primary">
          {{ data ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>
  `,
  styles: [``],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private youtubeRepo: YoutubeRepository
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [
        Validators.required,
      ]),
      email: new FormControl(this.data ? this.data.email : null, [
        Validators.required,
      ]),
    });
  }
  addOrUpdateUser() {
    if (this.data) {
      const updatedUser = { ...this.data, ...this.userForm.value };
      this.youtubeRepo.updateUser(updatedUser);
      this.dialogRef.close();
    } else {
      this.youtubeRepo.addUser(this.userForm.value);
      this.dialogRef.close();
    }
  }
}
