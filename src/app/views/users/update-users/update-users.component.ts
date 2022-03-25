import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Usersservice } from '../users.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css'],
  providers: [Usersservice, DecimalPipe]
})
export class UpdateUsersComponent implements OnInit {

  @Input() user:any;
  idusers:string;
  username:string;
  lastname:string;
  userrole:string;
  email:string;
  image:string;
  PhotoFileName:string;

  constructor(public formBuilder: FormBuilder,private modalService: NgbModal,private http: HttpClient,public service: Usersservice) { }
  /**
   * Returns form
   */
  get form() {
    return this.productForm.controls;
  }

  //image
 config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  method: 'POST',
  uploadMultiple: false,
  accept: (file) => {
    this.onAccept(file);
  }
 };
 file = '';

  productForm: FormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submitted: boolean;
  model: NgbDateStruct;
  selectValue = [];
  
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Update-Users', active: true }];
    this.selectValue = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado' ]

    this.productForm = this.formBuilder.group({
      username: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      userrole : ["", Validators.required]
    });
    this.submitted = false;
  }
  /**image */
 onAccept(file: any) {
  this.image = file.name;
  this.file = file;
 }

 updateuser(){
  var val = {
    idusers:this.idusers,
    username:this.username,
    lastname:this.lastname,
    userrole:this.userrole,
    email:this.email,
    image:this.image
  };

  this.service.updateusers(val).subscribe(res=>{
  alert(res.toString());
  });
}

uploadPhoto(event){
  var file=event.target.files[0];
  const formData:FormData=new FormData();
  formData.append('uploadedFile',file,file.name);

  this.service.UploadPhoto(formData).subscribe((data:any)=>{
    this.image=data.toString();
    this.PhotoFileName=this.service.PhotoUrl+this.image;
  })
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
    formData.append('username', this.productForm.get('username').value);
    formData.append('lastname', this.productForm.get('lastname').value);
    formData.append('email', this.productForm.get('email').value);
    formData.append('userrole', this.productForm.get('userrole').value);
    formData.append('image', this.file, this.image);

    this.http.post<any>(`http://localhost:8000/api/products`, formData)
      .subscribe((data) => {
        return data;
      });

  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

}
