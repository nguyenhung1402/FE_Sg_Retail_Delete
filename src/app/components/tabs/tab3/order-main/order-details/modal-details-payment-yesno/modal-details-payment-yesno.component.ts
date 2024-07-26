import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-details-payment-yesno',
  templateUrl: './modal-details-payment-yesno.component.html',
  styleUrls: ['./modal-details-payment-yesno.component.scss'],
})
export class ModalDetailsPaymentYesnoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(type: any) {
    return this.modalCtrl.dismiss('OK', type);
  }


}
