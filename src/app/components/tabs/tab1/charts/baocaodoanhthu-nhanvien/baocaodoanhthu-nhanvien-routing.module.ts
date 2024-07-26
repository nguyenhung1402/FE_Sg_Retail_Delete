import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaocaodoanhthuNhanVienPage } from './baocaodoanhthu-nhanvien.page';

const routes: Routes = [
  {
    path: '',
    component: BaocaodoanhthuNhanVienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaocaodoanhthuNhanVienPageRoutingModule {}
