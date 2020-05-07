import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrooveBoxComponent } from './groove-box/groove-box.component';

const routes: Routes = [{ path: '', component: GrooveBoxComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
