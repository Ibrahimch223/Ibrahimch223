import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

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
    this.breadCrumbItems = [{ label: 'Category' }, { label: 'Update-Category', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
      title: ["", Validators.required],
      role: ["", Validators.required],
      description: ["", Validators.required]
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
    formData.append('title', this.productForm.get('title').value);
    formData.append('role', this.productForm.get('role').value);
    formData.append('description', this.productForm.get('description').value);

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }


}
