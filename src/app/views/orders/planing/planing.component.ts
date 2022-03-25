import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/angular';
import { category, calendarEvents, createEventId } from './data';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { PlaningService } from './planing.service';

@Component({
  selector: 'app-planing',
  templateUrl: './planing.component.html',
  styleUrls: ['./planing.component.css']
})
export class PlaningComponent implements OnInit {
  @Input() planing:any;
  idplaning:number;
  name:string;
  category:string;

  @Input() cat:any;
  title:string;


  // bread crumb items
  breadCrumbItems: Array<{}>;

  @ViewChild('modalShow') modalShow: TemplateRef<any>;
  @ViewChild('editmodalShow') editmodalShow: TemplateRef<any>;

  formEditData: FormGroup;
  submitted = false;
  categorylist: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any[];
  planinglist:any=[];
  ActivateAddEditEmpComp:boolean=true;
  plan:any;
  // event form
  formData: FormGroup;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: calendarEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: true
    }
  };
  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Orders' }, { label: 'Calendar', active: true }];

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: [],
    });
    this._fetchData();
    this.loadvehicleList();
  }
  refreshplaningList() {
    this.service.getplaningList().subscribe(data => {
      this.planinglist = data;
    });
  }
  
  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.editEvent = clickInfo.event;
    this.formEditData = this.formBuilder.group({
      editTitle: clickInfo.event.title,
      editCategory: clickInfo.event.classNames[0],
    });
    this.modalService.open(this.editmodalShow);
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public service: PlaningService
  ) {}

  get form() {
    return this.formData.controls;
  }

  loadvehicleList(){
    this.service.getAllcategory().subscribe((data:any)=>{
      this.categorylist=data;
  
      this.title=this.cat.title;
    });
   }

  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.service.deleteplaning(this.idplaning).subscribe(data => { })
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Event add modal
   */
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalService.open(this.modalShow);
  }

  /**
   * save edit event data
   */
  editEventSave() {
    const editname = this.formEditData.get('name').value;
    const editCategory = this.formEditData.get('category').value;
    
    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.planing.idplaning + ''
    );

    this.planing.setProp('name', editname);
    this.planing.setProp('category', editCategory);

    this.calendarEvents[editId] = {
      ...this.planing,
      title: editname,
      id: this.planing.idplaning,
      category: editCategory + ' ' + 'text-white',
    };

    this.position();
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    var val = {
      idplaning: this.idplaning,
      name: this.name,
      category: this.category
    };

    this.service.updateplaning(val).subscribe(res => {

    });
    this.modalService.dismissAll();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }

  /**
   * Close event modal
   */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      name: '',
      category: '',
    });
    this.modalService.dismissAll();
  }

  /**
   * Save the event
   */
  saveEvent() {
    if (this.formData.valid) {
      const name = this.formData.get('name').value;
      const category = this.formData.get('category').value;
      const calendarApi = this.newEventDate.view.calendar;
      calendarApi.addEvent({
        id: createEventId(),
        name,
        start: this.newEventDate.date,
        end: this.newEventDate.date,
        category: category + ' ' + 'text-white'
      });
      this.position();
      this.formData = this.formBuilder.group({
        name: '',
        category: '',
      });
      this.modalService.dismissAll();
    }
    var val = {
      idplaning: this.idplaning,
      name: this.name,
      category: this.category
    };
      this.service.addplaning(val).subscribe(res => {
      });
    this.submitted = true;
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    // Event category
    // Calender Event Data
    this.calendarEvents = calendarEvents;
    // form submit
    this.submitted = false;
  }

}
