import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-deliveryman',
  templateUrl: './update-deliveryman.component.html',
  styleUrls: ['./update-deliveryman.component.scss']
})
export class UpdateDeliverymanComponent implements OnInit {

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
    this.breadCrumbItems = [{ label: 'Deliveryman' }, { label: 'Update-Deliveryman', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
      lastname: ["", Validators.required],
      typetransportation: ["", Validators.required],
      typepermit: ["", Validators.required],
      licensedate: ["", Validators.required]
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
    formData.append('typetransportation', this.productForm.get('typetransportation').value);
    formData.append('packageweight', this.productForm.get('packageweight').value);
    formData.append('typepermit', this.productForm.get('typepermit').value);
    formData.append('licensedate', this.productForm.get('licensedate').value)

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
