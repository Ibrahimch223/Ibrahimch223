import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PaymentSortableService, SortEvent } from '../payment-sortable.directive';
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';
import { Addpayment } from './adddeliveryman.model';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css'],
  providers: [PaymentService, DecimalPipe]
})
export class ListPaymentComponent implements OnInit {
  
// bread crumb items
formData: FormGroup; 
submitted = false;
AddpaymentData: Addpayment[];

term: any;

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 paymentData: Payment[];
 selectValue = [];

 payment$: Observable<Payment[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(PaymentSortableService) headers: QueryList<PaymentSortableService>;

 

 constructor(public service: PaymentService,private modalService: NgbModal, private formBuilder: FormBuilder) {
   this.payment$ = service.payment$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Payment' }, { label: 'List-Payment', active: true }];

   this.paymentData = this.paymentData;
   
   this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]
   
   this.formData = this.formBuilder.group({
    lastname: ["", Validators.required],
    subscriptiontype: ["", Validators.required],
    iduser: ["", Validators.required],
    description: ["", [Validators.required, Validators.email]],
    paymenttypemode: ["", Validators.required],
    amount: ["", Validators.required],
    status: ["", Validators.required],
    paymentdate: ["", Validators.required],
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
    this.AddpaymentData = this.AddpaymentData;
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
     const subscriptiontype = this.formData.get('subscriptiontype').value;
     const iduser = this.formData.get('iduser').value;
     const description = this.formData.get('description').value;
     const paymenttypemode = this.formData.get('paymenttypemode').value;
     const amount = this.formData.get('amount').value;
     const status = this.formData.get('status').value;

      this.AddpaymentData.push({
        id: this.AddpaymentData.length + 1,
        lastname,
        subscriptiontype,
        iduser,
        description,
        paymenttypemode,
        amount,
        status,
        paymentdate: currentDate + ':' 
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
