/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
      <nb-sidebar >
          <nb-sidebar-header style=" height:100px;background-color: #206ea1"> <img style="width:150px; height:90px;" src="assets/images/Morgue.svg"></nb-sidebar-header>
         <nb-sidebar-footer style="background-color: #206ea1"></nb-sidebar-footer>
      </nb-sidebar>
      <nb-layout windowMode>
          <nb-sidebar class="menu-sidebar" tag="menu-sidebar"
                      style="font-size: 25px; background: lightgray">
              <ng-content select="nb-menu" style="margin-top: 50px"></ng-content>
          </nb-sidebar>
          <nb-layout-column tag="menu-sidebar" style="  background-color: lightslategray">
          <ng-content select="router-outlet"></ng-content>
          </nb-layout-column>
          <nb-layout-footer fixed>
              <ngx-footer></ngx-footer>
          </nb-layout-footer>
      </nb-layout>    `,
})
export class OneColumnLayoutComponent {}
