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
import {NbCardModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from '../charts/charts.module';
import {NgxEchartsCoreModule} from 'ngx-echarts/core';
import { MychartsComponent } from './nouveaux-nes/mycharts.component';
import { NaturechartComponent } from './nature-deces/naturechart.component';
import { CausechartComponent } from './selon-cause/causechart.component';
import { SexechartComponent } from './sexe-deces/sexechart.component';
import { EnchatschartComponent } from './deces-enfants/enchatschart.component';
import { RegionchartComponent } from './region/regionchart.component';


@NgModule({
  declarations: [StatistiquesComponent,
    NouveauxNesComponent,
    DecesEnfantsComponent,
    NatureDecesComponent,
    MychartsComponent,
    PivotComponent, SexeDecesComponent, RegionComponent, SelonCauseComponent, MychartsComponent, NaturechartComponent, CausechartComponent, SexechartComponent, EnchatschartComponent, RegionchartComponent],
  imports: [
    CommonModule,
    StatistiquesRoutingModule,
    NbCardModule,
    FormsModule,
    ChartsModule,
    NgxEchartsCoreModule,
  ],
})
export class StatistiquesModule { }
