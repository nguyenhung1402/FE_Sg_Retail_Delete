import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import Chart from 'chart.js/auto';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  no: number,
  itemcode: string,
  beginqty: string,
  inqty: string,
  outqty: string,
  endqty: string,
}

export interface Group {
  group: string;
}

@Component({
  selector: 'app-baocao-nxt',
  templateUrl: './baocao-nxt.page.html',
  styleUrls: ['./baocao-nxt.page.scss'],
})
export class BaocaoNxtPage implements OnInit {
  @ViewChild('myChart') private myChart !: ElementRef;

  dateFrom = moment();
  dateTo = moment();
  Loading = true;
  const_data: any = {};
  currentUser: any = {};
  const_arr: any = [];
  const_category: any = [];
  label: any = [];
  data: any = [];
  API: any = '/reports/chartnxt';
  API_CATEGORY: string = '/category';

  doughnutChart: any;

  displayedColumns: string[] = ['itemcode', 'beginqty', 'inqty','outqty', 'endqty'];
  dataSource: any;


  constructor(private dateAdapter: DateAdapter<Date>, private _data: DataService,private authService: AuthService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    this.currentUser = this.authService.getParseTokenUser();
    this.loadcategory();
  }
  changeDate(event: any, dp: any, type: string) {
    if (type == 'fromdate') {
      if (dp.datepickerInput.value != null || dp.datepickerInput.value != undefined || dp.datepickerInput.value != '') {
        var fromdate = '';
        var todate = '';
        this.dateFrom = moment(event.value);
        fromdate = this.dateFrom.format('YYYY-MM-DD');
        this.dateFrom = moment(dp.datepickerInput.value);
        todate = this.dateFrom.format('YYYY-MM-DD');
        if (todate == 'Invalid date') {
          return;
        }
        this.loaddata(fromdate, todate);
      } else {
        return;
      }
    } else
      if (type == 'todate') {
        if (dp.datepickerInput.value != null || dp.datepickerInput.value != undefined || dp.datepickerInput.value != '') {
          var fromdate = '';
          var todate = '';
          this.dateFrom = moment(event.value);
          todate = this.dateFrom.format('YYYY-MM-DD');
          this.dateFrom = moment(dp.datepickerInput.value);
          fromdate = this.dateFrom.format('YYYY-MM-DD');
          if (fromdate == 'Invalid date') {
            return;
          }
          this.loaddata(fromdate, todate);
        } else {
          return;
        }
      }

  }
  loaddata(fromdate: any, todate: any) {
    this.const_data = {};
    this.Loading = false;
    this._data.post(this.currentUser.ip + this.API, { fromdate: fromdate.toString(), todate: todate.toString() }).subscribe(x => {
      this.const_data = x || [];
      this.mapCategoryAndData(x || []);
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
  mapCategoryAndData(data: any) {
    this.const_arr = [];
    var group = '';
    console.table(this.const_data.data);
    
    this.const_data?.data.forEach((element: any, index: any) => {
      if (index == 0) {
        this.const_arr.push({
          group: element.whsname
        });
        this.const_arr.push({
          no: index + 1,
          itemcode: element.itemcode,
          beginqty: element.beginqty.toString(),
          inqty: element.inqty.toString(),
          outqty: element.outqty.toString(),
          endqty: element.endqty.toString()
          // beginqty: element.beginqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          // inqty: element.inqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          // outqty: element.outqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          // endqty: element.endqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
      } else {
        if (group == element.whsname) {
          this.const_arr.push({
            no: index + 1,
            itemcode: element.itemcode,
            beginqty: element.beginqty.toString(),
            inqty: element.inqty.toString(),
            outqty: element.outqty.toString(),
            endqty: element.endqty.toString()
            
            // beginqty: element.beginqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // inqty: element.inqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // outqty: element.outqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // endqty: element.endqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          });
        } else {
          this.const_arr.push({
            group: element.whsname
          });
          this.const_arr.push({
            no: index + 1,
            itemcode: element.itemcode,
            beginqty: element.beginqty.toString(),
            inqty: element.inqty.toString(),
            outqty: element.outqty.toString(),
            endqty: element.endqty.toString()
            // beginqty: element.beginqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // inqty: element.inqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // outqty: element.outqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            // endqty: element.endqty.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          });
        }
      }
      group = element.whsname;
    });
    this.dataSource = this.const_arr;
    console.log(this.const_arr);
    
    
    // this.parseDataArrayString(data?.data);

  }
  parseDataArrayString(data: any) {
    this.label = [];
    this.data = [];
    data.forEach((element: any) => {
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
