import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category'];

  // coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog

    ) {
    // this.courses = new CoursesService();
    this.courses$ = coursesService.list()
    .pipe(
      catchError( error => {
        // console.log(error);
        this.onError('Erro ao carregar cursos!');
        return of([]);
      })
    );
  }

  ngOnInit(): void {

  }

  onError( errorMsg: string ) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }


}
