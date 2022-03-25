import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SortEvent, UsersSortableService } from '../users-sortable.directive';
import { Users } from '../users.model';
import { Usersservice } from '../users.service';
import { Addusers } from './addusers.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [Usersservice, DecimalPipe]
})
export class ListUsersComponent implements OnInit {

  @Input() user:any;
  idusers:number;
  username:string;
  lastname:string;
  userrole:string;
  email:string;
  image:string;
  PhotoFileName:string;

  @Input() role:any;
  titre:string;


// bread crumb items
formData: FormGroup; 
submitted = false;
AdduserData: Addusers[];
UsersList:any=[];
rolelist:any=[];

term: any;
ModalTitle:string;
ActivateAddEditEmpComp:boolean=true;
use:any;
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

// page
currentpage: number;
 // breadcrumb items
 breadCrumbItems: Array<{}>;

 userData: Addusers[];
 selectValue = [];
 //recherche
 useIdFilter:string="";
 userNameFilter:string="";
 userListWithoutFilter:any=[];

 users$: Observable<Addusers[]>;
 total$: Observable<number>;
 model: NgbDateStruct;
 @ViewChildren(UsersSortableService) headers: QueryList<UsersSortableService>;

 

 constructor(public service: Usersservice,private modalService: NgbModal, private formBuilder: FormBuilder,private http: HttpClient) {
   this.users$ = service.users$;
   this.total$ = service.total$;
 }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Users' }, { label: 'List-Users', active: true }];

   this.userData = this.userData;
   this.refreshuserList();
   
   this.formData = this.formBuilder.group({
    username: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    userrole : ["", Validators.required]
  });

  this.currentpage = 1;
  this.loadroleList()

  /**
   * Fetches the data
   */
  this._fetchData();
 }

 loadroleList(){
  this.service.getAllrole().subscribe((data:any)=>{
    this.rolelist=data;

    this.titre=this.role.titre;
  });
}

//---------add--------
adduser(){
  var val = {idusers:this.idusers,
              username:this.username,
              lastname:this.lastname,
              userrole:this.userrole,
              email:this.email,
              image:this.image};
  if(val!=null){
    this.service.addusers(val).subscribe(res=>{
      Swal.fire('Add success', 'You clicked the button!', 'success');
      this.refreshuserList();
    });
  }else{
    this.saveCustomer();
  }
  
}
//---------delete--------

deleteClick(item){
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
      this.service.deleteusers(item.idusers).subscribe(data=>{
        this.refreshuserList();
      })
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}
//---------list--------

 refreshuserList(){
  this.service.getusersList().subscribe(data=>{
    this.UsersList=data;
  });
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

/**image */
onAccept(file: any) {
  this.image = file.name;
  this.file = file;
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
    this.AdduserData = this.AdduserData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   * @param content1 modal content
   */
  openModal(content: any) {
    this.use={
      idusers:0,
      username:"",
      lastname:"",
      userrole:"",
      email:"",
      image:""
    }
    this.modalService.open(content,{ size: 'xl', centered: true });
    this.ActivateAddEditEmpComp=true;
  }

  editClick(item){
    console.log(item);
    this.use=item;
    this.modalService.open(item,{ size: 'xl', centered: true });
    this.ActivateAddEditEmpComp=true;
  }

  saveCustomer() {
    this.submitted = true;
    const formData = new FormData();
    formData.append('username', this.formData.get('username').value);
    formData.append('lastname', this.formData.get('lastname').value);
    formData.append('email', this.formData.get('email').value);
    formData.append('userrole', this.formData.get('userrole').value);
     formData.append('image', this.image);

    this.http.post<any>(`http://localhost:8000/api/products`, formData)
      .subscribe((data) => {
        return data;
      });

  }

  FilterFn(){
    var useIdFilter = this.useIdFilter;
    var userNameFilter = this.userNameFilter;

    this.UsersList = this.userListWithoutFilter.filter(function (el){
        return el.email.toString().toLowerCase().includes(
          useIdFilter.toString().trim().toLowerCase()
        )&&
        el.username.toString().toLowerCase().includes(
          userNameFilter.toString().trim().toLowerCase()
        )
    });
  }

}
