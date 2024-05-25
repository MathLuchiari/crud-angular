import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor(
    private service: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,

  ) {
    //this.form
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });

    console.log(course)
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
