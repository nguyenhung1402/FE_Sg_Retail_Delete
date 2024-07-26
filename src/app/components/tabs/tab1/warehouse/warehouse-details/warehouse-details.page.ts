import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.page.html',
  styleUrls: ['./warehouse-details.page.scss'],
})
export class WarehouseDetailsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  public items: any;
  formGroup !: FormGroup;
  const_data: any = [];
  currentUser: any = {};
  valueForm: any = '';
  dynamictype: string = "number";
  API: string = '/warehouse';
  Loading= true;

  constructor(
    private _data: DataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    // private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    // const itemId = +this.route.snapshot.params['id'];
    // this.items = this.dataService.getById_WhsData(itemId);

    // this.createForm();
    // this.editForm();
    this.loaddata();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'whscode': [null, Validators.required],
      'whsname': [null, Validators.required],
      'address': [null, Validators.required],
      'remarks': [null, Validators.required],
      'status': [null],
    });
  }

  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API + `/${itemId}`).subscribe(x => {
        this.items = x || [];
        this.setValue(this.items?.data);
        this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }

  }

  setValue(values: any) {
    this.formGroup.controls["whscode"].setValue(values.whscode);
    this.formGroup.controls["whsname"].setValue(values.whsname);
    // this.formGroup.controls["group"].setValue(values.group);
    this.formGroup.controls["address"].setValue(values.address);
    this.formGroup.controls["remarks"].setValue(values.remarks);
    this.formGroup.controls["status"].setValue(values.status)
    this.formGroup.controls["whscode"].disable();
  
  }
  

  onSubmit(post:any) {
    this.valueForm = post;
  }

  editForm() {
    this.formGroup.controls["whscode"].setValue(this.items?.whscode);
    this.formGroup.controls["whsname"].setValue(this.items?.whsname);
    // this.formGroup.controls["group"].setValue(this.items?.group); 
    this.formGroup.controls["remarks"].setValue(this.items?.remarks);
    this.formGroup.controls["address"].setValue(this.items?.address);
    this.formGroup.controls["status"].setValue(this.items?.status)
  }


  confirm(values:any) {
    this.modal.dismiss(this.name, 'confirm');
    
    this.onSubmit(values);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}
    values.userupdate = this.currentUser?.username;
    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, values).subscribe(res => {
      this._data.showUpdateSuccess(values.whscode);
    })
  }
  
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');


}

}
