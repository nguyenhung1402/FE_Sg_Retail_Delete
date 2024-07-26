import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { ChartReportComponent } from './chart-report/chart-report.component';
import { chart } from 'src/app/services/link-id.index';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
// export class ChartsPage implements OnInit,AfterViewInit  {
//   @ViewChild('barCanvas')
//   private barCanvas!: ElementRef;
//   @ViewChild('myChart')
//   private myChart!: ElementRef;

//   barChart: any;
//   doughnutChart: any;
//   lineChart: any;


//   headerMenu = '';
//   constructor(
//     private navCtrl: NavController,
//     private activatedRoute: ActivatedRoute,
//     private modalCtrl: ModalController,

//   ) { }


//   ngOnInit() {
//     // this.headerMenu = this.activatedRoute.snapshot.data['some_date'];
//   }
//   cancel() {
//     return this.modalCtrl.dismiss(null, 'cancel');
//   }

//   confirm() {
//     return this.modalCtrl.dismiss('this.name', 'confirm');
//   }
//   ngAfterViewInit() {
//     this.barChartMethod();
//     this.doughnutChartMethod();
//   }

//   barChartMethod() {
//     this.barChart = new Chart(this.barCanvas.nativeElement, {
//       type: 'bar',
//       data: {
//         labels: ['V000011', 'V000050', 'V000196', 'V000214', 'V000956', 'V000001'],
//         datasets: [{
//           label: '# of Vendor',
//           data: [200, 50, 30, 15, 20, 34],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255,99,132,1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//         }]
//       }
//     });
//   }

//   doughnutChartMethod() {
//     this.doughnutChart = new Chart(this.myChart.nativeElement, {
//       type: 'doughnut',
//       data: {
//         labels: ['V000011', 'V000050', 'V000196', 'V000214', 'V000956'],
//         datasets: [{
//           label: '# of Vendor',
//           data: [50, 29, 15, 10, 7],
//           backgroundColor: [
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)'
//           ],
//           hoverBackgroundColor: [
//             '#FFCE56',
//             '#FF6384',
//             '#36A2EB',
//             '#FFCE56',
//             '#FF6384'
//           ]
//         }]
//       }
//     });
//   }


// }





// import { Chart } from 'chart.js';



export class ChartsPage implements OnInit {
  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('myChart') private myChart !: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  headerMenu = '';
  API: any = '/reports/itemcode';
  API_YEAR: any = '/reports/years';


  defaultValueYear = new Date().getFullYear();
  constructor(
    private navCtrl: NavController,
    private _data: DataService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }


  ngOnInit() {

  }
  async openReport() {
    const modal = await this.modalCtrl.create({
      component: ChartReportComponent,
      componentProps: {
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  public openItem(itemId: number): void {
    if (itemId == 1) {
      this.navCtrl.navigateForward([chart.baocaodoanhthutheongay, itemId]);
    }
    if (itemId == 2) {
      this.navCtrl.navigateForward([chart.baocaodoanhthutheothang, itemId]);
    }
    if (itemId == 3) {
      this.navCtrl.navigateForward([chart.baocaodoanhthutheonam, itemId]);
    }
    if (itemId == 4) {
      this.navCtrl.navigateForward([chart.baocaonxt, itemId]);
    }
    if (itemId == 5) {
      this.navCtrl.navigateForward([chart.baocaotonghopnhapkho, itemId]);
    }
    if (itemId == 6) {
      this.navCtrl.navigateForward([chart.baocaotonghopxuatkho, itemId]);
    }
    if (itemId == 7) {
      this.navCtrl.navigateForward([chart.baocaodoanhthunhanvien, itemId]);
    }
  }
}

