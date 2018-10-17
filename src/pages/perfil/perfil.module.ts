import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from './perfil';
import { PerfilEditPageModule } from './perfil-edit/perfil-edit.module';

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
    PerfilEditPageModule
  ],
})
export class PerfilPageModule {}
