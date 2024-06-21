import { Location, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrl: './course-form.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatHint, NgIf, MatError, MatSelect, MatOption, MatIconButton, MatIcon, NgFor, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent {

    form!: FormGroup;

  constructor(
    private service: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {
    //this.form
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
        _id: [course._id],
        name: [course.name, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(100)
                  ]
                ],
        category: [course.category, [Validators.required]],
        lessons: this.formBuilder.array( this.retrieveLessons(course), Validators.required )
      });

      console.log(this.form);
      console.log(this.form.value);
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]]
    })
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson( index: number ) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save( this.form.value ).subscribe({
        complete: () => {
          this.onSuccess();
        },
        error: error => {
          this.onError();
        }
      });
    } else {
      this.formUtils.validadeAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.formUtils.msgSnackBar("Curso salvo com sucesso!");
    this.onCancel();
  }

  onError() {
    this.formUtils.msgSnackBar("Erro ao salvar curso!");
  }
}
