import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { Chart } from 'chart.js';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface PeriodicElement {
  no: number,
  // itemcode: string,
  total: string,
  discount: string
}

export interface Group {
  group: string;
}
@Component({
  selector: 'app-baocaodoanhthutheo-thang',
  templateUrl: './baocaodoanhthutheo-thang.page.html',
  styleUrls: ['./baocaodoanhthutheo-thang.page.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BaocaodoanhthutheoThangPage implements OnInit {
  @ViewChild('myChart') private myChart !: ElementRef;
  date = new FormControl(moment());
  // date = moment();
  Loading = true;
  const_data: any = {};
  currentUser: any = {};
  const_arr: any = [];
  const_category: any = [];
  label: any = [];
  data: any = [];
  API: any = '/reports/chartmonth';
  API_CIRCLE: any = '/reports/chartmonthcircle';
  API_CATEGORY: string = '/category';

  doughnutChart: any;

  displayedColumns: string[] = ['no', 'total', 'discount'];
  dataSource: any;


  constructor(private dateAdapter: DateAdapter<Date>, private _data: DataService,private authService: AuthService ) {
    // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadcategory();

    var months = '';
    var months = '';
    var years = '';
    var convertDate = moment();
    months = convertDate.format('MM');
    years = convertDate.format('YYYY');
    this.loaddata(months, years);
    this.loaddataCircle(months, years);
  }
  changeDate(event: any) {
    var months = '';
    var years = '';
    var convertDate = moment(event._d);
    // this.date = moment(event.value);

    months = convertDate.format('MM');
    years = convertDate.format('YYYY');
    
    // months = this.date.format('MM');
    // years = this.date.format('YYYY');
    this.loaddata(months, years);
    this.loaddataCircle(months, years);
  }
  loaddata(month: any, year: any) {
    this.const_data = {};
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API, { month: month.toString(), year: year.toString() }).subscribe(x => {
      this.const_data = x || [];
      this.mapCategoryAndData(x || []);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  loaddataCircle(month: any, year: any) {
    var const_circle = {};
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API_CIRCLE, { month: month.toString(), year: year.toString() }).subscribe(x => {
      const_circle = x || [];
      this.parseDataArrayString(const_circle);
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  loadcategory() {
    this.Loading = false;
    this._data.get(this.currentUser.ip + this.API_CATEGORY).subscribe(x => {
      this.const_category = x || [];
      this.Loading = true;
    }, (error) => {
      this.Loading = true;
      console.log(error);
    });
  }
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  mapCategoryAndData(data: any) {
    this.const_arr = [];
    var group = '';
    this.const_data?.data.forEach((element: any, index: any) => {
      if (index == 0) {
        this.const_arr.push({
          group: element.group
        });
        this.const_arr.push({
          no: index + 1,
          itemcode: element.itemcode,
          total: element.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          discount: element.discount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
      } else {
        if (group == element.group) {
          this.const_arr.push({
            no: index + 1,
            itemcode: element.itemcode,
            total: element.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            discount: element.discount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          });
        } else {
          this.const_arr.push({
            group: element.group
          });
          this.const_arr.push({
            no: index + 1,
            itemcode: element.itemcode,
            total: element.total.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            discount: element.discount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          });
        }
      }
      group = element.group;
    });
    this.dataSource = this.const_arr;
    

  }
  parseDataArrayString(data: any) {
    this.label = [];
    this.data = [];
    data?.data.forEach((element: any) => {
      this.label.push(element.group);
      this.data.push(element.total);
    });
    this.doughnutChartMethod();
  };
  isGroup(index: any, item: any): boolean {
    return item.group;
  }
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
            'rgba(240,248,255,1)',
            'rgba(0,255,255,1)',
            'rgba(245,245,220,1)',
            'rgba(0,0,255,1)',
            'rgba(138,43,226,1)',
            'rgba(165,42,42,1)',
            'rgba(222, 184,135,1)',
            'rgba(95,158,160,1)',
            'rgba(127,255,0,1)',
            'rgba(0,139,139,1)',
            'rgba(255,140,0,1)',
            'rgba(255,215,0,1)',
            'rgba(0,128,0,1)'

          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            'rgba(153, 102, 255, 0.2)',
            'rgba(240,248,255,1)',
            'rgba(0,255,255,1)',
            'rgba(245,245,220,1)',
            'rgba(0,0,255,1)',
            'rgba(138,43,226,1)',
            'rgba(165,42,42,1)',
            'rgba(222, 184,135,1)',
            'rgba(95,158,160,1)',
            'rgba(127,255,0,1)',
            'rgba(0,139,139,1)',
            'rgba(255,140,0,1)',
            'rgba(255,215,0,1)',
            'rgba(0,128,0,1)'
          ]
        }]
      }
    });
  }

}
