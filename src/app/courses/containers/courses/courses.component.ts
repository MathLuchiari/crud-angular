import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  // coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar

    ) {
    // this.courses = new CoursesService();
    this.refresh()
  }

  ngOnInit(): void {

  }

  refresh() {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError( error => {
        // console.log(error);
        this.onError('Erro ao carregar cursos!');
        return of([]);
      })
    );
  }

  onError( errorMsg: string ) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit( course: Course ) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route})
    // this.router.navigate([`edit`], {relativeTo: this.route})
  }

  onDelete(course: Course): void {

    const dialogRef = this.dialog.open( ConfirmationDialogComponent, {
      data: "Tem certeza que deseja deletar este curso?"
    })

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if( result ) {
          this.coursesService.remove( course._id ).subscribe({
            next: () => {
              this._snackBar.open("Curso removido com sucesso!", 'X', {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });

              this.refresh()
            },
            error: () => {
              this.onError('Erro ao deletar curso!');
            }
          })
        }
      }
    })
  }
}
