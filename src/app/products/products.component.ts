import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['query'];
  data: MatTableDataSource<Product>;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private api: ApiService ) { 
    
  }
  

  ngOnInit() {
    this.api.getProducts()
    .subscribe(res => {
      this.data = res.results;
      this.data = new MatTableDataSource(res.results);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      console.log("data",this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.data.filter = filterValue;
  }
 

}
