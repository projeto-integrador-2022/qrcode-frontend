import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'storeName', 'name', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(): void {
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  storeName: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1, 
    storeName: 'Cine Astro', 
    name: 'John Doe', 
    email: 'john.doe@gmail.com'
  },


];

