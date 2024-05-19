import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor() { }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit( course: Course ) {
    this.edit.emit(course);
  }
}
