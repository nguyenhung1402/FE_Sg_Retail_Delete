import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { UrlConstants } from 'src/app/commons/UrlConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-detais',
  templateUrl: './item-detais.page.html',
  styleUrls: ['./item-detais.page.scss'],
})
export class ItemDetaisPage implements OnInit {

  public items: any;
  currentUser: any = {};

  formGroup!: FormGroup;
  valueForm: any = '';
  dynamictype: string = "number";
  API: string = '/items';
  Loading = true;
  values: any
  API_DETAIL: string = '/images'
  BASE_SERVERS: any = UrlConstants.BASE_SERVER + '/';
  fileToUpload: File | null = null;
  uploadImage_1: any = null;
  preview_upload1: any;
  uploadImage_2: any;
  preview_upload2: any;
  uploadImage_3: any;
  preview_upload3: any;
  nameFileUpload: any;
  API_category: string = '/category';
  public Category: any;
  anh: any;
  groupForm:any;

  constructor(
    private route: ActivatedRoute,
    private _data: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder, private _uploadService: FileUploadService,

  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadData_Category()
    this.loaddata();
  }
  loaddata() {
    this.Loading = false;
    this.createForm();
    const itemId = +this.route.snapshot.params['id'];
    if (itemId != null || itemId != undefined) {
      this._data.get(this.currentUser.ip + this.API + `/${itemId}`).subscribe(x => {
        this.items = x || [];
        this.setValue(this.items?.data);
        // this.Loading = true;
      }, (error) => {
        this.Loading = true;
      });
    } else {
      this.Loading = true;
    }

  }

  btnRefresh() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API).subscribe(x => {
      this.items = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }

  loadData_Category() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_category).subscribe(x => {
      this.Category = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  //Number(values.doctotal.replace(/,/g, ""))
  setValue(values: any) {
    var imgDefault = '../../../../../../assets/images/imgdefault.jpeg';
    values.categorycode = values.group;
    this.groupForm= values.group;
    setTimeout(() => {
      this.Loading = false;
      this.formGroup.controls["itemcode"].setValue(values.itemcode);
      this.formGroup.controls["itemname"].setValue(values.itemname);
      this.formGroup.controls["category"].setValue(values.group.toString());
      this.formGroup.controls["price"].setValue(values.price.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.formGroup.controls["status"].setValue(values.status = values.status == true ? '1' : '0');

      if (values.image == null || values.image == undefined || values.image == '') {
        this.preview_upload1 = imgDefault
      } else {
        this.preview_upload1 = this.BASE_SERVERS + values.image;
        this.anh = values.image;
      }
      this.formGroup.controls["image"].setValue(this.preview_upload1);

      this.formGroup.controls["itemcode"].disable();
    }, 1000);

    setTimeout(() => {
      this.Loading = true;
    }, 1000);

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'itemcode': [null, Validators.required],
      'itemname': [null, Validators.required],
      'category': [null],
      // 'instock' : [null,Validators.required],
      'price': [null, Validators.required],
      'status': [null, Validators.required],
      'image': [null]
    });


  }


  UpdateItem(values: any) {
    const itemId = +this.route.snapshot.params['id'];
    var const_update = {}
    values.group = values.category;
    // values.price = Number(values.price.replace(/,/g, ""))
    values.price = Number(this.formGroup.getRawValue().price.replace(/,/g, ""))
    values.status = true;
    values.userupdate = this.currentUser?.username;

    if (this.nameFileUpload == null || this.nameFileUpload == undefined || this.nameFileUpload == '') {
      values.image = this.anh;
    } else {
      values.image = this.nameFileUpload.image_save_url;

    }

    this._data.put(this.currentUser.ip + this.API + `/${itemId}`, values).subscribe(res => {
      this._data.showUpdateSuccess(values.itemcode);
    })
  }

  // UpdateImage(values:any){
  //   const itemId = +this.route.snapshot.params['id'];
  //   var const_update = {}
  //   if (this.nameFileUpload != null || this.nameFileUpload != undefined || this.nameFileUpload != '') {
  //     values.image = this.nameFileUpload.image_save_url;
  //   } else {
  //     values.image = values.image;
  //   }
  //   this._data.put(this.API + `/${itemId}`, values).subscribe(res => {
  //     this._data.showUpdateSuccess(values.itemcode);
  //   })
  // }

  onSubmit(post: any) {
    this.valueForm = post;
  }



  selectFile(event: any) {
    this.preview_upload1 = null;
    const file = event.target.files[0];
    this.uploadImage_1 = event.target.files as FileList
    const reader = new FileReader();
    reader.onload = e => this.preview_upload1 = reader.result;
    reader.readAsDataURL(file);
    this.handleFileInput();
  }

  // saveImage(values: any) {
  //   const itemId = +this.route.snapshot.params['id'];
  //   if (values != '' || values != null || values != undefined) {
  //     this._data.put(this.API_DETAIL + '/images' + `/${itemId}`, { imgcenter: values.image_save_url, status: false }).subscribe(res => {
  //       this._data.showUpdateSuccess(values.image_save_url);
  //     });
  //   }
  // }

  handleFileInput() {
    // let files = event.target.files as FileList
    // this.fileToUpload = files.item(0);
    // if (this.fileToUpload) {
    //   this._uploadService.postFile(this.fileToUpload).subscribe(data => {
    //     // do something, if upload success 
    //   }, error => {
    //     console.log(error);
    //   });
    // }
    this.fileToUpload = null;

    var nameFile;
    this.fileToUpload = this.uploadImage_1.item(0);
    if (this.fileToUpload) {
      this._uploadService.postFile(this.fileToUpload).subscribe((data: any) => {
        // do something, if upload success 
        // this.saveImage(data);
        this.nameFileUpload = data;

      }, (error: any) => {
        console.log(error);
      });
    }
  }
}
