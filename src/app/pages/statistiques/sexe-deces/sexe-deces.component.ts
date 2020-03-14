import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-sexe-deces',
  templateUrl: './sexe-deces.component.html',
  styleUrls: ['./sexe-deces.component.scss'],
  providers: [DecedesService],
})
export class SexeDecesComponent {
}
