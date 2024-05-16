import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private service: CoursesService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  onSubmit() {
    this.service.save( this.form.value ).subscribe({
      complete: () => {
        this.onSuccess();
      },
      error: error => {
        this.onError();
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this._snackBar.open("Curso salvo com sucesso!", '', { duration: 5000});
    this.onCancel();
  }

  onError() {
    this._snackBar.open("Erro ao salvar curso!", '', { duration: 5000});
  }

}
