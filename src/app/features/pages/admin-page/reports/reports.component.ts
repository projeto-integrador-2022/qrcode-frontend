import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'accessedPage', 'name', 'city', 'email', 'accessDate', 'sessionTime', 'os', 'browser'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  toppings = new FormControl('');
  toppingList: string[] = ['Lindoka Kosméticos', 'Gráfica Jesus', 'Mulher Barbada Cabelereiro', 'Dunder Mifflin Distribuição', 'Bada-Bing Diversões', 'Poyos Hermanos'];

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
  {
    position: 1, 
    storeName: 'Cine Astro', 
    accessedPage: 'Página oficial',
    name: 'Joanna Doe', 
    city: 'Goiânia',
    email: 'joanna.doe@gmail.com',
    accessDate: '05/05/2020 - 12:55:08',
    sessionTime: '3m e 30s',
    os: 'Apple Iphone Pro Max',
    browser: 'Safari'
  },

  {
    position: 1, 
    storeName: 'Lindoka Kosméticos', 
    accessedPage: 'Instagram',
    name: 'Peggy Olsen', 
    city: 'Aparecida de Goiânia',
    email: 'miss.peggy@gmail.com',
    accessDate: '07/05/2020 - 15:03:08',
    sessionTime: '1m e 30s',
    os: 'Sangung Galaxy S10',
    browser: 'Chrome'
  },


];

