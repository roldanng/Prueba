import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['image','titulo'];
  data: MatTableDataSource<Product>;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private api: ApiService ) {
  }
  /* */

  ngOnInit() {
    /* todo */
    this.api.getProducts()
    .subscribe((res : any) => {
      console.log("res",res);
      this.data = new MatTableDataSource(res.results);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }


  profileForm = new FormGroup({
      search: new FormControl(''),
    });

  onSubmit() {

    this.api.getProduct(this.profileForm.value.search)
      .subscribe((res : any) => {
        this.data = new MatTableDataSource(res.results);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.isLoadingResults = false;
      });
  

    console.warn(this.profileForm.value.search);
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.data.filter = filterValue;
  }
 

}
