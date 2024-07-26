import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LayoutCenterComponent } from "./pages/layout-center/layout-center.component";
import { AuthGuard } from "./_layouts/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "centers",
    component: LayoutCenterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "tabs",
        loadChildren: () =>
          import("./components/tabs/tabs.module").then((m) => m.TabsPageModule),
      },
    ],
  },

  // {
  //   path: 'order',
  //   loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  // },
  // {
  //   path: 'order-main',
  //   loadChildren: () => import('./components/tabs/tab3/order-main/order-main.module').then( m => m.OrderMainPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
