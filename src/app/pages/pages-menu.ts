/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import {NbMenuItem} from '@nebular/theme';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class PagesMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu = [
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
        children: undefined,
      },
    ];

    const menu = [
      {
        title: '',
        group: true,
      },
      {
        title: 'Bulletin de décès et de mortinalité',
        children: [
          {
            title: 'Bulletins',
            link: '/pages/bulletins-dm/Bulletins',
          },
          {
            title: 'Décèdes',
            link: '/pages/bulletins-dm/decedes',
          },
          {
            title: 'Cause de décès',
            link: '/pages/bulletins-dm/cause-deces',
          },
          {
            title: 'Médecins',
            link: '/pages/bulletins-dm/medcins',
          },
        ],
      },
      {
        title: 'Documents administrative',
        children: [
          {
            title: 'certificat médico-légal',
            link: '/pages/documents-admin/medicolegal',
          },
          {
            title: 'certificat de constation',
            link: '/pages/documents-admin/constation',
          },
          {
            title: 'Attestation de Décès',
            link: '/pages/documents-admin/attestation',
          },
        ],
      },
      {
        title: 'Certificats',
        children: [
          {
            title: 'certificat du transfert du corps',
            link: '/pages/certificats/transfertCorps',
          },
          {
            title: 'Aperçu du corps',
            link: '/pages/certificats/ApercuDuCorp',
          },
          {
            title: 'certificat Enterrement',
            link: '/pages/certificats/enterrement',
          },
        ],
      },
      {
        title: 'statistiques',
        children: [
          {
            title: 'Décès des nouveaux nés',
            link: '/pages/statistiques/NouveauxNes',
          },
          {
            title: 'Décès des enfants leurs ages de 1j à 30j',
            link: '/pages/statistiques/DecesEnfants',
          },
          {
            title: 'Selon la nature de décès',
            link: '/pages/statistiques/NatureDeces',
          },
         /* {
            title: 'Selon la nature de décès(pivot) ',
            link: '/pages/statistiques/pivot',
          },*/
          {
            title: 'Selon les causes de décès',
            link: '/pages/statistiques/seloncausesDeces',
          },
          {
            title: 'Selon le sexe de décèdé ',
            link: '/pages/statistiques/sexeDeces',
          },
          {
            title: 'Selon la région',
            link: '/pages/statistiques/region',
          },
        ],
      },
      {
        title: 'Rapport',
        children: [
          {
            title: 'My Dashboard',
            link: '/pages/rapport/dashbord',
          },
        ],
      },
      {
        title: 'Auth',
        children: [
          {
            title: 'Login',
            link: '/auth/login',
          },
          {
            title: 'Register',
            link: '/auth/register',
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
          },
        ],
      },
    ];

    return of([...dashboardMenu, ...menu]);
  }
}
