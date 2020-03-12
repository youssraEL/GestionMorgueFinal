import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';
import {BulletinsService} from '../../../@core/backend/common/services/Bulletins.service';

@Component({
  selector: 'ngx-nature-deces',
  providers: [DecedesService],
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  styleUrls: ['./nature-deces.component.scss'],
})
export class NatureDecesComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  List = [];
  MN: number; MNN: number;

  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
  }
  ngAfterViewInit() {
    this.serviceD.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.natureMort);
      });
      this.MNN = 0; this.MN = 0;
      for (let j = 0; j < this.List.length; j++) {
       if (this.List[j] === 'Mort naturel') {this.MN = this.MN + 1; }
        if (this.List[j] === 'Mort non naturel') {this.MNN = this.MNN + 1; }
      }

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mort Non Naturel', 'Mort Naturel'],
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: [this.MNN, this.MN],
            },
          ],
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
