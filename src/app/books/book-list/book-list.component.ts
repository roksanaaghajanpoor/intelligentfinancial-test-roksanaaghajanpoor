import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { AuthService } from 'src/app/authentication/auth.service';
import { IbookData } from '../book-data.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  displayedColumns = ['ID', 'BirthDate', 'JobTitle', 'HireDate'];
  dataSource: MatTableDataSource<IbookData>;
  users: IbookData[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService) {
    this.getBooksList();
  }

  getBooksList(): void {
    this.authService.getBooksList().subscribe((response) => {
      for (let i = 0; i <= response.length; i++) { this.users.push(response[i]); }
      this.users.push(response);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}



