import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.scss'],
})



export class ChartReportComponent implements OnInit {
  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('myChart') private myChart !: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  headerMenu = '';
  API: any = '/reports/itemcode';
  API_YEAR: any = '/reports/years';

  Loading = true;

  const_data: any = {};
  label: any = [];
  data: any = [];
  month: any[] = [
    { value: 1, viewValue: 'Tháng 1' },
    { value: 2, viewValue: 'Tháng 2' },
    { value: 3, viewValue: 'Tháng 3' },
    { value: 4, viewValue: 'Tháng 4' },
    { value: 5, viewValue: 'Tháng 5' },
    { value: 6, viewValue: 'Tháng 6' },
    { value: 7, viewValue: 'Tháng 7' },
    { value: 8, viewValue: 'Tháng 8' },
    { value: 9, viewValue: 'Tháng 9' },
    { value: 10, viewValue: 'Tháng 10' },
    { value: 11, viewValue: 'Tháng 11' },
    { value: 12, viewValue: 'Tháng 12' },
  ];
  year: any = {};
  currentUser: any = {};
  defaultValueMonth = (new Date().getUTCMonth() + 1);
  defaultValueYear: any;
  constructor(
    private navCtrl: NavController,
    private _data: DataService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
  }


  ngOnInit() {
    this.headerMenu = this.activatedRoute.snapshot.data['some_date'];
    this.currentUser = this.authService.getParseTokenUser();
    this.defaultValueYear = (new Date().getFullYear());
    this.loadyear();
    this.loaddata(this.defaultValueMonth.toString(), this.defaultValueYear.toString());
  }
  loaddata(month: any, year: any) {
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API, { month: month.toString(), year: year.toString() }).subscribe(x => {
      this.const_data = x || [];
      this.parseDataArrayString(this.const_data?.data || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
    });
  }
  loaddataChangeSelectOption(month: any, year: any) {
    this.const_data = {};
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API, { month: month.toString(), year: year.toString() }).subscribe(x => {
      this.const_data = x || [];
      this.parseDataArrayStringSelectOption(this.const_data?.data || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
    });
  }
  loadyear() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_YEAR).subscribe(x => {
      // this.year = x || [];
      this.setValueYear(x || [])
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
    })
  }

  setValueYear(data: any) {
    this.year = data;
  }

  parseDataArrayString(data: any[]) {
    data.forEach(element => {
      this.label.push(element.itemcode);
      this.data.push(element.total);
    });
    this.doughnutChartMethod();
  };

  parseDataArrayStringSelectOption(data: any[]) {
    this.label = [];
    this.data = [];
    data.forEach(element => {
      this.label.push(element.itemcode);
      this.data.push(element.total);
    });
    this.doughnutChartMethod();
  };

  // ngAfterViewInit() {
  //   // this.barChartMethod();
  //   this.doughnutChartMethod();
  // }

  // barChartMethod() {
  //   this.barChart = new Chart(this.barCanvas.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: ['V000011', 'V000050', 'V000196', 'V000214', 'V000956', 'V000001'],
  //       datasets: [{
  //         label: '# of Vendor',
  //         data: [200, 50, 30, 15, 20, 34],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255,99,132,1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     }
  //   });
  // }

  doughnutChartMethod() {
    if (this.doughnutChart != undefined) {
      this.doughnutChart.destroy();
    }
    this.doughnutChart = new Chart(this.myChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [{
          label: '# of Vendor',
          data: this.data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            'rgba(153, 102, 255, 0.2)',
          ]
        }]
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}

