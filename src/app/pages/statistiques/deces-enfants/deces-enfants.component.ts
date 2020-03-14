import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ngx-deces-enfants',
  templateUrl: './deces-enfants.component.html',
  styleUrls: ['./deces-enfants.component.scss'],
})
export class DecesEnfantsComponent {
}
