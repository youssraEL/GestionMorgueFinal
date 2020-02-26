import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiquesRoutingModule } from './statistiques-routing.module';
import { StatistiquesComponent } from '../statistiques/statistiques.component';
import { NouveauxNesComponent } from './nouveaux-nes/nouveaux-nes.component';
import { DecesEnfantsComponent } from './deces-enfants/deces-enfants.component';
import { NatureDecesComponent } from './nature-deces/nature-deces.component';
import { PivotComponent } from './pivot/pivot.component';
import { SexeDecesComponent } from './sexe-deces/sexe-deces.component';
import { RegionComponent } from './region/region.component';
import { SelonCauseComponent } from './selon-cause/selon-cause.component';
import {NbCardModule} from "@nebular/theme";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [StatistiquesComponent,
    NouveauxNesComponent,
    DecesEnfantsComponent,
    NatureDecesComponent,
    PivotComponent, SexeDecesComponent, RegionComponent, SelonCauseComponent],
  imports: [
    CommonModule,
    StatistiquesRoutingModule,
    NbCardModule,
    FormsModule,
  ],
})
export class StatistiquesModule { }
