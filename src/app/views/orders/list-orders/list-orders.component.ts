import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OrderService } from '../orders.service';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderSortableService, SortEvent } from '../orders-sortable.directive';
import { ordersData } from '../data';
import { Orders } from '../orders.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Addorder } from './addorder.model';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [OrderService, DecimalPipe]
})
export class ListOrdersComponent implements OnInit {
// bread crumb items
formData: FormGroup;
submitted = false;
AddorderData: Addorder[];

term: any;

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 ordersData: Orders[];
 selectValue = [];

 orders$: Observable<Orders[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(OrderSortableService) headers: QueryList<OrderSortableService>;

 

 constructor(public service: OrderService,private modalService: NgbModal, private formBuilder: FormBuilder) {
   this.orders$ = service.orders$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Orders' }, { label: 'List-Orders', active: true }];

   this.ordersData = ordersData;
   
   this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]
   
   this.formData = this.formBuilder.group({
    sender: ['', [Validators.required]],
    reciver: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    packageweight: ['', [Validators.required]],
    state: ['', [Validators.required]],
    packagelength: ['', [Validators.required]],
    packagewidth: ['', [Validators.required]],
    deliveryrate: ['', [Validators.required]],
    packagetype: ['', [Validators.required]],
    deliverydate: ['', [Validators.required]],
    ordernumber: ['', [Validators.required]],
    deliveryperson: ['', [Validators.required]],
    reasons: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  this.currentpage = 1;

  /**
   * Fetches the data
   */
  this._fetchData();
 }

 /**
 * Sort table data
 * @param param0 sort the column
 *
 */
 onSort({ column, direction }: SortEvent) {
 
   // resetting other headers
   this.headers.forEach(header => {
     if (header.sortable !== column) {
       header.direction = '';
     }
   });
   this.service.sortColumn = column;
   this.service.sortDirection = direction;
 }

 /**
   * Customers data fetches
   */
  private _fetchData() {
    this.AddorderData = this.AddorderData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
     const sender = this.formData.get('sender').value;
     const reciver = this.formData.get('reciver').value;
     const packageweight = this.formData.get('packageweight').value;
     const state = this.formData.get('state').value;
     const packagelength= this.formData.get('packagelength').value;
     const packagewidth = this.formData.get('packagewidth').value;
     const deliveryrate = this.formData.get('deliveryrate').value;
     const packagetype = this.formData.get('packagetype').value;

      this.AddorderData.push({
        id: this.AddorderData.length + 1,
        sender,
        reciver,
        packageweight,
        state,
        packagelength,
        packagewidth,
        deliveryrate,
        packagetype,
        deliverydate: currentDate + ':' 
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
