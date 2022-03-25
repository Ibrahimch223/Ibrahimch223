import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-customers',
  templateUrl: './update-customers.component.html',
  styleUrls: ['./update-customers.component.css']
})
export class UpdateCustomersComponent implements OnInit {

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
  
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Customers' }, { label: 'Update-Customers', active: true }];

    this.productForm = this.formBuilder.group({
      lastname: ["", Validators.required],
      address: ["", Validators.required],
      number: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      country: ["", Validators.required],
      city: ["", Validators.required]
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
    formData.append('address', this.productForm.get('address').value);
    formData.append('number', this.productForm.get('number').value);
    formData.append('email', this.productForm.get('email').value);
    formData.append('country', this.productForm.get('country').value);
    formData.append('city', this.productForm.get('city').value);

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
