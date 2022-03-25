import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.css']
})
export class UpdateOrdersComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal) { }
  /**
   * Returns form
   */
  get form() {
    return this.productForm.controls;
  }

  productForm: FormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submitted: boolean;
  model: NgbDateStruct;
  selectValue = [];
  
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Orders' }, { label: 'Update-Orders', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
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
    this.submitted = false;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content);
  }
  
  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submitted = true;
    const formData = new FormData();
    formData.append('sender', this.productForm.get('sender').value);
    formData.append('reciver', this.productForm.get('reciver').value);
    formData.append('packageweight', this.productForm.get('packageweight').value);
    formData.append('state', this.productForm.get('state').value);
    formData.append('packagelength', this.productForm.get('packagelength').value);
    formData.append('packagewidth', this.productForm.get('packagewidth').value);
    formData.append('deliveryrate', this.productForm.get('deliveryrate').value);
    formData.append('packagetype', this.productForm.get('packagetype').value);

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
