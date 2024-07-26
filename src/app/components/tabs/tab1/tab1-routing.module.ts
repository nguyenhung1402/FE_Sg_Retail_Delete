import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    // children: [
    //   {
    //     path: 'items/:id',
    //     loadChildren: () => import('../../../components/tabs/tab1/items/items.module').then( m => m.ItemsPageModule),
    //     data: {some_date: 'Item Master Data'}
    //   }
    // ]

  },
  {
    path: 'items/:id',
    loadChildren: () => import('../../../components/tabs/tab1/items/items.module').then(m => m.ItemsPageModule),
    data: { some_date: 'Item Master Data' }
  },
  {
    path: 'item-detais/:id',
    loadChildren: () => import('../../../components/tabs/tab1/items/item-detais/item-detais.module').then(m => m.ItemDetaisPageModule),
    data: { some_date: 'Chi tiết' }
  },
  {
    path: 'item-add',
    loadChildren: () => import('../../../components/tabs/tab1/items/item-add/item-add.module').then(m => m.ItemAddPageModule),
    data: { some_date: 'Add Item' }
  },
  {
    path: 'business/:id',
    loadChildren: () => import('../../../components/tabs/tab1/business/business.module').then(m => m.BusinessPageModule),
    data: { some_date: 'Business Partner' }
  },
  {
    path: 'business-details/:id',
    loadChildren: () => import('../../../components/tabs/tab1/business/business-details/business-details.module').then(m => m.BusinessDetailsPageModule)
  },
  {
    path: 'business-add',
    loadChildren: () => import('../../../components/tabs/tab1/business/business-add/business-add.module').then(m => m.BusinessAddPageModule)
  },
  {
    path: 'warehouse/:id',
    loadChildren: () => import('../../../components/tabs/tab1/warehouse/warehouse.module').then(m => m.WarehousePageModule),
    data: { some_date: 'Quản lý kho' }
  },
  {
    path: 'warehouse-details/:id',
    loadChildren: () => import('../../../components/tabs/tab1/warehouse/warehouse-details/warehouse-details.module').then( m => m.WarehouseDetailsPageModule)
  },
  {
    path: 'warehouse-add',
    loadChildren: () => import('../../../components/tabs/tab1/warehouse/warehouse-add/warehouse-add.module').then( m => m.WarehouseAddPageModule)
  },
  {
    path: 'receipt/:id',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule),
    data: { some_date: 'Nhập kho' }
  },
  {
    path: 'issue/:id',
    loadChildren: () => import('./issue/issue.module').then( m => m.IssuePageModule),
    data: { some_date: 'Xuất kho' }
  },
  {
    path: 'charts/:id',
    loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule),
    data: { some_date: 'Báo cáo' }
  },
  {
    path: 'issue-detail/:id',
    loadChildren: () => import('../tab1/issue/issue-detail/issue-detail.module').then( m => m.IssueDetailPageModule)
  },
  {
    path: 'issue-history',
    loadChildren: () => import('../tab1/issue/issue-history/issue-history.module').then( m => m.IssueHistoryPageModule)
  },
  {
    path: 'receipt-detail/:id',
    loadChildren: () => import('../tab1/receipt/receipt-detail/receipt-detail.module').then( m => m.ReceiptDetailPageModule)
  },
  {
    path: 'receipt-history',
    loadChildren: () => import('../tab1/receipt/receipt-history/receipt-history.module').then( m => m.ReceiptHistoryPageModule)
  },
  {
    path: 'baocaodoanhthutheo-ngay/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocaodoanhthutheo-ngay/baocaodoanhthutheo-ngay.module').then( m => m.BaocaodoanhthutheoNgayPageModule)
  },
  {
    path: 'baocaodoanhthutheo-thang/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocaodoanhthutheo-thang/baocaodoanhthutheo-thang.module').then( m => m.BaocaodoanhthutheoThangPageModule)
  },
  {
    path: 'baocaodoanhthutheo-nam/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocaodoanhthutheo-nam/baocaodoanhthutheo-nam.module').then( m => m.BaocaodoanhthutheoNamPageModule)
  },
  {
    path: 'baocao-nxt/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocao-nxt/baocao-nxt.module').then( m => m.BaocaoNxtPageModule)
  },
  {
    path: 'baocaotonghop-nhapkho/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocaotonghop-nhapkho/baocaotonghop-nhapkho.module').then( m => m.BaocaotonghopNhapkhoPageModule)
  },
  {
    path: 'baocaotonghop-xuatkho/:id',
    loadChildren: () => import('../../tabs/tab1/charts/baocaotonghop-xuatkho/baocaotonghop-xuatkho.module').then( m => m.BaocaotonghopXuatkhoPageModule)
  },
  {
    path: 'bin/:id',
    loadChildren: () => import('./bin/bin.module').then( m => m.BinPageModule),
    data: { some_date: 'Bin Location' }
  },
  {
    path: 'bin-add',
    loadChildren: () => import('../../tabs/tab1/bin/bin-add/bin-add-routing.module').then( m => m.BinAddPageRoutingModule)
  },
  {
    path: 'bin-details/:id',
    loadChildren: () => import('../../tabs/tab1/bin/bin-details/bin-details-routing.module').then( m => m.BinDetailsPageRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule { }
