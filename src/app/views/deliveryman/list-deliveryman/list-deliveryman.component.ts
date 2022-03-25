import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DeliverymanSortableService, SortEvent } from '../deliveryman-sortable.directive';
import { Deliveryman } from '../deliveryman.model';
import { DeliverymanService } from '../deliveryman.service';
import { Adddeliveryman } from './adddeliveryman.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-list-deliveryman',
  templateUrl: './list-deliveryman.component.html',
  styleUrls: ['./list-deliveryman.component.css'],
  providers: [DeliverymanService, DecimalPipe]
})
export class ListDeliverymanComponent implements OnInit {

// bread crumb items
formData: FormGroup; 
submitted = false;
AdddeliverymanData: Adddeliveryman[];

term: any;

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 deliverymanData: Deliveryman[];
 selectValue = [];

 deliveryman$: Observable<Deliveryman[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(DeliverymanSortableService) headers: QueryList<DeliverymanSortableService>;

 

 constructor(public service: DeliverymanService,private modalService: NgbModal, private formBuilder: FormBuilder) {
   this.deliveryman$ = service.deliveryman$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Deliveryman' }, { label: 'List-Deliveryman', active: true }];

   this.deliverymanData = this.deliverymanData;
   
   this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]
   
   this.formData = this.formBuilder.group({
    lastname: ["", Validators.required],
    typetransportation: ["", Validators.required],
    typepermit: ["", Validators.required],
    licensedate: ["", Validators.required],
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
    this.AdddeliverymanData = this.AdddeliverymanData;
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
     const lastname = this.formData.get('lastname').value;
     const typetransportation = this.formData.get('typetransportation').value;
     const typepermit = this.formData.get('typepermit').value;

      this.AdddeliverymanData.push({
        id: this.AdddeliverymanData.length + 1,
        lastname,
        typetransportation,
        typepermit,
        licensedate: currentDate + ':' 
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}

