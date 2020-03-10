import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';

@Component({
  selector: 'ngx-nouveaux-nes',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  styleUrls: ['./nouveaux-nes.component.scss'],
  providers: [DecedesService],
})
export class NouveauxNesComponent implements AfterViewInit, OnDestroy {
  List = [];
  List1 = [];
  m1: number; m3: number; m4: number; m5: number; m9: number; m10: number;
  m2: number; m6: number; m7: number; m8: number; m11: number; m12: number;
  options: any = {};
  themeSubscription: any;
  constructor(private serviceDecede: DecedesService, private theme: NbThemeService) {
  }
  ngAfterViewInit() {
    /*this.serviceDecede.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.mortNe);
        this.List1.push(obj.dateNaissance);
      });
      this.m2 = 0;

      for (let j = 0; j < this.List.length; j++) {
        if (this.List[j] === 1) {
          /!*if (this.List1[j].includes('2020-02')) {
            this.m2 = this.m2 + 1;
          }*!/
        }
      }*/
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.success, colors.info],
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['2020'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          grid: {
            top: 70,
            bottom: 50,
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors.info,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
              axisPointer: {
                label: {
                  formatter: params => {
                    return (
                      ' ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                    );
                  },
                },
              },
              data: [
                '2020-1',
                '2020-2',
                '2020-3',
                '2020-4',
                '2020-5',
                '2020-6',
                '2020-7',
                '2020-8',
                '2020-9',
                '2020-10',
                '2020-11',
                '2020-12',
              ],
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
              name: '2020',
              type: 'line',
              smooth: true,
              data: [3.9, 45, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
            },
          ],
        };
      });
  //  });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
