
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UrlConstants } from '../commons/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  pathMenu = 'assets/mock/menu.json';
  pathItem = 'assets/mock/item.json';

  pathItemMaterData = 'assets/mock/item.json';
  pathBusiness = 'assets/mock/business.json';
  pathReceipt = 'assets/mock/receipt.json';
  pathIssue = 'assets/mock/issue.json';
  pathWhs = 'assets/mock/warehouse.json';
  pathTable = 'assets/mock/table.json';
  pathInvoice = 'assets/mock/invoice.json'
  public items: any = [];
  itemMaterData: any = [];
  bussinessMaterData: any = [];
  receiptData: any = [];
  issueData: any = [];
  whsData: any = [];
  tableData: any = [];
  invoiceData: any = [];
  images ={imgesURL:"../assets/images/coca.jpg"};

  constructor(private _http: HttpClient, private toastController: ToastController) { }

    createrheader() {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
    }

    // server local
    getListMenu() {
      return this._http.get(this.pathMenu);
    }
    getListItem() {
      return this._http.get(this.pathItem);
    }
    getItemMaterData() {
      this._http.get(this.pathItemMaterData).subscribe((data) => {
        this.itemMaterData = data;
        this.images
      });
      return this._http.get(this.pathItemMaterData);
    }
  
    getTableData() {
      this._http.get(this.pathTable).subscribe((data) => {
        this.tableData = data;
        this.images
      });
      return this._http.get(this.pathTable);
    }
  
    getInvoiceData() {
      this._http.get(this.pathInvoice).subscribe((data) => {
        this.invoiceData = data;
        this.images
      });
      return this._http.get(this.pathInvoice);
    }
  
    getBusinessMaterData() {
      this._http.get(this.pathBusiness).subscribe((data) => {
        this.bussinessMaterData = data;
      });
      return this._http.get(this.pathBusiness);
    }
  
    getReceiptData() {
      this._http.get(this.pathReceipt).subscribe((data) => {
        this.receiptData = data;
      });
      return this._http.get(this.pathReceipt);
    }
  
    getIssuetData() {
      this._http.get(this.pathIssue).subscribe((data) => {
        this.issueData = data;
      });
      return this._http.get(this.pathIssue);
    }
  
    getWhsData() {
      this._http.get(this.pathWhs).subscribe((data) => {
        this.whsData = data;
      });
      return this._http.get(this.pathWhs);
    }
    
    public getItem(itemId: number) {
      return this.items.find((x: any) => x.id === itemId);
    }
  
    public getTable(itemId: number) {
      return this.items.find((x: any) => x.id === itemId);
    }
  
    public getById_ItemMaterData(itemId: number) {
      this._http.get(this.pathItemMaterData).subscribe((data) => {
        this.itemMaterData = data;
      });
      return this.itemMaterData.find((x: any) => x.id === itemId);
    }
  
    public getById_TableData(itemId: number) {
      this._http.get(this.pathTable).subscribe((data) => {
        this.tableData = data;
      });
      return this.tableData.find((x: any) => x.id === itemId);
    }
  
    public getById_InvoiceData(itemId: number) {
      this._http.get(this.pathInvoice).subscribe((data) => {
        this.invoiceData = data;
      });
      return this.invoiceData.find((x: any) => x.id === itemId);
    }
  
    public getById_BusinessMaterData(itemId: number) {
      this._http.get(this.pathBusiness).subscribe((data) => {
        this.bussinessMaterData = data;
      });
      return this.bussinessMaterData.find((x: any) => x.id === itemId);
    }
  
  
    public getById_ReceiptData(itemId: number) {
      this._http.get(this.pathReceipt).subscribe((data) => {
        this.receiptData = data;
      });
      return this.receiptData.find((x: any) => x.id === itemId);
    }
  
    public getById_IssueData(itemId: number) {
      this._http.get(this.pathIssue).subscribe((data) => {
        this.issueData = data;
      });
      return this.issueData.find((x: any) => x.id === itemId);
    }
  
    public getById_WhsData(itemId: number) {
      this._http.get(this.pathWhs).subscribe((data) => {
        this.whsData = data;
      });
      return this.whsData.find((x: any) => x.id === itemId);
    }
  
    putProduct(data : any, id : number){
      return this._http.put<any>(this.pathItemMaterData + id, data);
    }
    deleteProduct(id : number){
      return this._http.delete<any>(this.pathItemMaterData+ id);
    }
  
  
    
  
    public getMaxId() {
      return this.items.length;
    }
    pustItems(item: any) {
      this.items.push(item);
    }
  
    postItems(item: any) {
    }

    // end server local


    // server
    get(uri: string) {
        const header = this.createrheader();
        // return this._http.get(UrlConstants.BASE_SERVER + uri, { headers: header });
        return this._http.get(uri, { headers: header });
    }
    // Thêm mới
    post(uri: string, data?: any) {
        const header = this.createrheader();
        // return this._http.post(UrlConstants.BASE_SERVER + uri, data, { headers: header });
        return this._http.post(uri, data, { headers: header });
    }
    // Update
    put(uri: string, data?: any) {
        const header = this.createrheader();
        return this._http.put(uri, data, { headers: header });
        // return this._http.put(UrlConstants.BASE_SERVER + uri, data, { headers: header });
    }
    delete(uri: string) {
        const header = this.createrheader();
        // return this._http.delete(UrlConstants.BASE_SERVER + uri, { headers: header });
        return this._http.delete(UrlConstants.BASE_SERVER + uri, { headers: header });
    }
    // end sevrer


    // thông báo
    showSaveSuccess() {
        this.presentToast('top', `Thêm mới thành công`);
    }
    showUpdateSuccess(name: any) {
        this.presentToast('top', `Cập nhật thành công`);
    }
    showDeleteSuccess(name: any) {
        this.presentToast('top', `Xóa ${name} thành công`);
    }
    showNotSuccess() {
        this.presentToast('top', `Thêm mới không thành công`);
    }
    showNotSuccessSearch() {
        this.presentToast('top', `Bạn chưa chọn giá trị search`);
    }
    showNotFormValidation() {
        this.presentToast('top', `Bạn chưa nhập đủ thông tin`);
    }

    showConnectSuccessIntegration() {
        this.presentToast('top', `Connect to SAP success !`);
    }

    showNotConnectSuccessIntegration() {
        this.presentToast('top', `Connect to SAP false !`);
    }
    showNotMissField(field: any) {
        this.presentToast('top', `Field ${field} not empty !`);
    }
    showJVIntegationSuccess() {
        this.presentToast('bott', `Post Journal Vouchers Susscess !`);
    }
    showIntegationSuccess() {
        this.presentToast('bot', `Integration SAP Susscess !`);
    }
    // End thông báo

    async presentToast(position: any, note: any) {
        const toast = await this.toastController.create({
            message: note,
            duration: 1500,
            position: position
        });

        await toast.present();
    }
}
