import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartModalComponent } from './cart-modal.component';

@NgModule({
  declarations: [CartModalComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CartModalComponent]
})
export class CartModalModule {}
