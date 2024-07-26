import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bin-details',
  templateUrl: './bin-details.page.html',
  styleUrls: ['./bin-details.page.scss'],
})
export class BinDetailsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  public items: any;
  formGroup !: FormGroup;
  const_data: any = [];
  currentUser: any = {};
  valueForm: any = '';
  dynamictype: string = "number";
  API: string = '/table';
  Loading = true;

  constructor(
    private _data: DataService,
    private route: ActivatedRoute,
    // private dataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthService 
  ) { }

  ngOnInit() {
    // const itemId = +this.route.snapshot.params['id'];
    // this.items = this.dataService.getById_WhsData(itemId);

    // this.createForm();
    // this.editForm();
    this.currentUser = this.authService.getParseTokenUser();
    this.loaddata();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'tablenumber': [null, Validators.required],
      'remark': [null],
      'status': ['1'],
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
    this.formGroup.controls["tablenumber"].setValue(values.tablenumber);
    this.formGroup.controls["remark"].setValue(values.remark);
    this.formGroup.controls["tablenumber"].disable();
  }

  onSubmit(post: any) {
    this.valueForm = post;
  }

  editForm() {
    this.formGroup.controls["tablenumber"].setValue(this.items?.tablenumber);
    this.formGroup.controls["remark"].setValue(this.items?.remark);
  }


  confirm(values: any) {
    this.modal.dismiss('this.name', 'confirm');

    this.onSubmit(values);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}
    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, values).subscribe(res => {
      this._data.showUpdateSuccess(values.whscode);
    })
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');


  }

}
