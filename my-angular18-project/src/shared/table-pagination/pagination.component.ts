import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [CommonModule],
  styleUrls: ['./pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() pageLimit: number = 3;
  @Input() totalEntities: number = 10;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    const pagesCount = Math.ceil(this.totalEntities / this.pageLimit);
    this.pages = this.range(1, pagesCount);
  }

  private range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
}
