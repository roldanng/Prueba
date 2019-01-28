import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  data: null;
  isLoadingResults = true;


  constructor( private route: ActivatedRoute, private api: ApiService, private router: Router ) { }

  ngOnInit() {
    this.api.getProductDetail(this.route.snapshot.params['id'])
      .subscribe((res : any) => {
        this.data = res;
        this.isLoadingResults = false;
        console.log("res:",res);
      });

  }

}
