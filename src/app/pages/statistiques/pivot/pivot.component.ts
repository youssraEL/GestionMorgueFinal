import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {pdfMake} from 'pdfmake/build/pdfmake';
import {pdfFonts} from 'pdfmake/build/vfs_fonts';
import {PdfMakeWrapper} from 'pdfmake-wrapper';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'ngx-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss'],
})
export class PivotComponent  {
}
