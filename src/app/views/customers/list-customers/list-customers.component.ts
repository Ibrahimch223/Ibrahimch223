import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CustomersSortableService, SortEvent } from '../customers-sortable.directive';
import { Customers } from '../customers.model';
import { CustomersService } from '../customers.service';
import { Addcustomers } from './addcustomers.model';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.scss'],
  providers: [CustomersService, DecimalPipe]
})
export class ListCustomersComponent implements OnInit {
  @Input() customers: any;
  idcustomers: number;
  lastname: string;
  address: string;
  number: number;
  email: string;
  country: string;
  city: string;

  // bread crumb items
  formData: FormGroup;
  submitted = false;
  AddcustomersData: Addcustomers[];
  customerslist: any = [];
  ActivateAddEditEmpComp: boolean = true;
  customer: any;

  term: any;

  // page
  currentpage: number;
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  customersData: Customers[];

  customers$: Observable<Customers[]>;
  total$: Observable<number>;
  model: NgbDateStruct;
  @ViewChildren(CustomersSortableService) headers: QueryList<CustomersSortableService>;



  constructor(public service: CustomersService, private modalService: NgbModal, private formBuilder: FormBuilder, private http: HttpClient) {
    this.customers$ = service.customers$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'List-Customers', active: true }];

    this.customersData = this.customersData;

    this.formData = this.formBuilder.group({
      lastname: ["", Validators.required],
      address: ["", Validators.required],
      number: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      country: ["", Validators.required],
      city: ["", Validators.required]
    });

    this.currentpage = 1;
    this.refreshcustomersList();

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  //---------add--------
  addcustomers() {
    var val = {
      idcustomers: this.idcustomers,
      lastname: this.lastname,
      address: this.address,
      number: this.number,
      email: this.email,
      country: this.country,
      city: this.city
    };
    if (val != null) {
      this.service.addcustomers(val).subscribe(res => {
        Swal.fire('Add success', 'You clicked the button!', 'success');
        this.refreshcustomersList();
      });
    } else {
      this.saveCustomer();
    }

  }
  //---------delete--------

  deleteClick(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.service.deletecustomers(item.idcustomers).subscribe(data => {
          this.refreshcustomersList();
        })
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  //---------list--------

  refreshcustomersList() {
    this.service.getcustomersList().subscribe(data => {
      this.customerslist = data;
    });
  }

  updatecustomers() {
    var val = {
      idcustomers: this.idcustomers,
      lastname: this.lastname,
      address: this.address,
      number: this.number,
      email: this.email,
      country: this.country,
      city: this.city
    };

    this.service.updatecustomers(val).subscribe(res => {
      Swal.fire('Add success', 'You clicked the button!', 'success');
      this.refreshcustomersList();
    });
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
    this.AddcustomersData = this.AddcustomersData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.customer = {
      idcustomers: 0,
      lastname: "",
      address: "",
      number: "",
      email: "",
      country: "",
      city: ""
    }
    this.modalService.open(content, { size: 'xl', centered: true });
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item) {
    console.log(item);
    this.customer = item;
    this.modalService.open(item, { size: 'xl', centered: true });
    this.ActivateAddEditEmpComp = true;
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const lastname = this.formData.get('lastname').value;
      const address = this.formData.get('address').value;
      const number = this.formData.get('number').value;
      const email = this.formData.get('email').value;
      const country = this.formData.get('number').value;
      const city = this.formData.get('number').value;

      this.AddcustomersData.push({
        id: this.AddcustomersData.length + 1,
        lastname,
        address,
        number,
        email,
        country,
        city

      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
