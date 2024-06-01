import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: ['', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
              ]
            ],
    category: ['', [Validators.required]]
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

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if(field?.errors) {
      console.log(field.errors)
    }

    if( field?.hasError('required') ) {
      return 'Campo obrigatório!';
    }

    if( field?.hasError('minlength') ) {
      const requiredMinLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredMinLength} caracteres!`;
    }

    if( field?.hasError('maxlength') ) {
      const requiredMaxLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredMaxLength} caracteres!`;
    }

    return 'Campo inválido!'
  }

}
