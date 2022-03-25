import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent implements OnInit {

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
    this.breadCrumbItems = [{ label: 'Payment' }, { label: 'Update-Payment', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
    lastname: ["", Validators.required],
    subscriptiontype: ["", Validators.required],
    iduser: ["", Validators.required],
    description: ["", [Validators.required, Validators.email]],
    paymenttypemode: ["", Validators.required],
    amount: ["", Validators.required],
    status: ["", Validators.required],
    paymentdate: ["", Validators.required],
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
    formData.append('lastname', this.productForm.get('lastname').value);
    formData.append('subscriptiontype', this.productForm.get('subscriptiontype').value);
    formData.append('iduser', this.productForm.get('iduser').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('paymenttypemode', this.productForm.get('paymenttypemode').value);
    formData.append('amount', this.productForm.get('amount').value);
    formData.append('status', this.productForm.get('status').value);
    formData.append('paymentdate', this.productForm.get('paymentdate').value);

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
