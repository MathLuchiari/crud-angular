import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../model/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrl: './courses-list.component.scss',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatMiniFabButton, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor() { }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit( course: Course ) {
    this.edit.emit(course);
  }

  onDelete( course: Course ) {
    console.log('Entrou Delete')
    this.delete.emit(course);
  }
}
