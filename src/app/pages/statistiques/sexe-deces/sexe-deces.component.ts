import { Component, OnInit } from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {Decedes} from '../../../@core/backend/common/model/Decedes';

@Component({
  selector: 'ngx-sexe-deces',
  templateUrl: './sexe-deces.component.html',
  styleUrls: ['./sexe-deces.component.scss'],
  providers: [DecedesService, UsersService],
})
export class SexeDecesComponent implements OnInit {
Decede: Decedes = new Decedes();
  constructor(private service: DecedesService ) {}
  stackedChart = {
    title: 'la mrtalité des femmes et des hommes',
    typeChart: 'AreaChart',
    columnNames: ['Femme', 'Homme' , 'Indéfini'],
    options : {
      hAxis: {
        title: ''},
      vAxis: {title: ''},
    },
    width : 1000,
    height : 200,
    data : [[0, 0 , 0]],
  };
  chartType =  [{type : 'LineChart', name : 'Line'}, {type : 'AreaChart', name : 'Area '},
    {type : 'BarChart' , name : 'Bar'},
    {type : 'ColumnChart' , name : 'Column'} ] ;

  ngOnInit() {
  }

  searchFor() {
  }
}
