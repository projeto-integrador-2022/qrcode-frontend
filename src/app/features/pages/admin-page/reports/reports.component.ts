import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'storeName', 'accessedPage', 'name', 'city', 'email', 'accessDate', 'sessionTime', 'os', 'browser'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(): void {
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {

  position: number;
  storeName: string;
  accessedPage: string;
  name: string;
  city: string;
  email: string;
  accessDate: string;
  sessionTime: string;
  os: string
  browser: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1, 
    storeName: 'Cine Astro', 
    accessedPage: 'Voucher',
    name: 'John Doe', 
    city: 'Goiânia',
    email: 'john.doe@gmail.com',
    accessDate: '05/05/2020 - 12:35:08',
    sessionTime: '2m e 30s',
    os: 'Apple Iphone Pro',
    browser: 'Safari'
  },


];

