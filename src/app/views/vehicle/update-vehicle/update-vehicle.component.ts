import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {

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
    this.breadCrumbItems = [{ label: 'Vehicle' }, { label: 'Update-Vehicle', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
      brand: ["", Validators.required],
      mileage: ["", Validators.required],
      registrationnumber: ["", Validators.required],
      state : ["", Validators.required],
      costoftechnicalvisit: ["", Validators.required],
      costofinsurance: ["", Validators.required],
      typeofvehicle: ["", Validators.required],
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
    formData.append('brand', this.productForm.get('brand').value);
    formData.append('mileage', this.productForm.get('mileage').value);
    formData.append('registrationnumber', this.productForm.get('registrationnumber').value);
    formData.append('state', this.productForm.get('state').value);
    formData.append('costoftechnicalvisit', this.productForm.get('costoftechnicalvisit').value);
    formData.append('costofinsurance', this.productForm.get('costofinsurance').value);
    formData.append('typeofvehicle', this.productForm.get('typeofvehicle').value);

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
