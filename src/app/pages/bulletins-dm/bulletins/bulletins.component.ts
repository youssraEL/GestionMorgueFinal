import {Component, Input, OnInit} from '@angular/core';
import {Bulletins} from '../../../@core/backend/common/model/Bulletins';
import {BulletinsService} from '../../../@core/backend/common/services/Bulletins.service';
import {LocalDataSource} from 'ng2-smart-table';
import {DecedesComponent} from '../decedes/decedes.component';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DecedesList} from '../../../@core/backend/common/model/DecedesList';
import {formatDate} from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Base64 } from 'js-base64';

@Component({
  selector: 'ngx-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss'],
  providers: [ BulletinsService, DecedesService, MedecinsService, UsersService],
})

export class BulletinsComponent implements OnInit {
  compostage: string;
  constation: string;
  Bulletins: Bulletins = new Bulletins();
  typeBulletin = ['Bulletin de décès', 'Bulletin de mortinalité'];
  Milieu = ['Urbain', 'Rural', 'Inconnu'];
  Lieu = ['Tanger', 'Asila', 'Tetouan'];
  province = ['Tanger-Assilah', 'M\'diq-Fnideq', 'Tétouan', 'Fahs-Anjra', 'Larache', 'Al Hoceïma', 'Chefchaouen', 'Ouezzane'];
  num = [1, 2, 3, 4, 5, 6, 7, 8];
  diagnostique = ['Mort naturelle', 'Mort non naturelle'];
  cimetiere = ['Cimetière Almojahidine', 'Cimetière Sidi Omar'];
  data: any;
  private sourceD: Decedes;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },
    columns: {
      typeBulletin: {
        title: 'Type Bulletin',
        type: 'string',
      },
      declaration: {
        title: 'Date de déclaration',
        type: 'Date',
      },
      province: {
        title: 'Province ou préfecture',
        type: 'number',
      },
      cercle: {
        title: 'Cercle',
        type: 'number',
      },
      centre: {
        title: 'Municipalité/Centre/Commune',
        type: 'number',
      },
      diagnostique: {
        title: 'Diagnostiue Attestation',
        type: 'number',
      },
      residece: {
        title: 'Milieu résidence',
        type: 'number',
      },
      LieuEntrement: {
        title: 'Lieu Entrement',
        type: 'number',
      },
      cimetiere: {
        title: 'Cimetière',
        type: 'number',
      },
      NumTombe: {
        title: 'Numéro de tombe',
        type: 'number',
      },
      recherche: {
        title: 'Recherche',
        type: 'number',
      },
    },
  };
  // source: Bulletins = new LocalDataSource();
  settingsD = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },
    columns: {
      id: {
        title: 'numéro de registre',
        type: 'number',
        editable: false,
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      sexe: {
        title: 'Sexe',
        type: 'string',
      },
      CIN: {
        title: 'CIN',
        type: 'string',
      },
      dateNaissance: {
        title: 'Date de naissance',
        type: 'Date',
      },
      fils: {
        title: 'Fille ou fils de ',
        type: 'String',
      },
      nationalite: {
        title: 'Nationalité ',
        type: 'String',
      },
      adresse: {
        title: 'Adresse',
        type: 'String',
      },
      Etat: {
        title: 'Etat Matrimonial',
        type: 'String',
      },
      profession: {
        title: 'Profession',
        type: 'String',
      },
      dateDeces: {
        title: 'date décès',
        type: 'Date',
      },
      heure: {
        title: 'date décès',
        type: 'Date',
      },
      lieuxDeces: {
        title: 'Lieu de décès',
        type: 'String',
      },
      natureMort: {
        title: 'nature de mort',
        type: 'String',
      },
      mortNe: {
        title: 'S\'agit-il d\'un mort né',
        type: 'boolean',
      },
      causeMort: {
        title: 'Cause de mort',
        type: 'String',
      },
      causeInitial: {
        title: 'Cause initiale',
        type: 'String',
      },
      causeImmdiate: {
        title: 'Cause immédiate',
        type: 'String',
      },
      obstacle: {
        title: 'Obstacle medicolégal',
        type: 'boolean',
      },
    },
  };
  settingsM = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      adress: {
        title: 'Adresse',
        type: 'string',
      },
      CIN: {
        title: 'CIN d\'encadrant',
        type: 'string',
      },
    },
  };
  private source: Bulletins;
  private sourceM: Medecins;
  isAdmin: boolean;
  DecedeHumain = [];

  constructor(private service: BulletinsService, private serviceD: DecedesService, private serviceM: MedecinsService,
              private serviceS: SmartTableData, private userservice: UsersService ) {
  }


  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  initD() {
    this.serviceD.getAll().subscribe(data => {
      this.sourceD = data;
    });
  }
  initM() {
    this.serviceM.getAll().subscribe(data => {
      this.sourceM = data;
    });
  }
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      console.log(data);
      console.log(data.role);
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
    this.initM();
    this.initD();
  }


  save() {
      this.service.create(this.Bulletins).subscribe(obj => {
        this.init();
      });
      // this.reset();
      this.init();
      window.alert('Les données ont été ajoutées avec succès à la base de données');
  }

  private reset() {
    this.Bulletins = new Bulletins();
  }
  createConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.create(event.newData).subscribe(obj => {
        });
        // this.init();
      });
    }
  }
  onEditConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        console.log(data);
        event.confirm.resolve(event.newData);
        this.service.update(event.newData).subscribe(obj => {
        });
        window.alert('les donnes sont change avec succes');
      });
    }
  }
  onDeleteConfirm(event) {
    if (this.isAdmin) {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve(event.data);
        this.service.delete(event.data.id).subscribe(data => {
          console.log(data);
        });
      } else {
        event.confirm.reject(event.data);
      }
    }
  }
  createConfirmD(event) {
    if (this.isAdmin) {
      this.serviceD.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.serviceD.create(event.newData).subscribe(obj => {
        });
        this.initD();
      });
    }
  }
  onEditConfirmD(event) {
    if (this.isAdmin) {
      this.serviceD.getAll().subscribe(data => {
        console.log(data);
        event.confirm.resolve(event.newData);
        this.serviceD.update(event.newData).subscribe(obj => {
          this.initD();
        });
        window.alert('les donnes sont change avec succes');
      });
    }
  }
  onDeleteConfirmD(event) {
    if (this.isAdmin) {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve(event.data);
        this.serviceD.delete(event.data.id).subscribe(data => {
          console.log(data);
          this.initD();
        });
      } else {
        event.confirm.reject(event.data);
      }
    }
  }
  createMedcin(event) {
    if (this.isAdmin) {
      this.serviceM.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.serviceM.create(event.newData).subscribe(obj => {
        });
        this.initM();
      });
    }
  }
  onEditMedcin(event) {
    if (this.isAdmin) {
      this.serviceM.getAll().subscribe(data => {
        console.log(data);
        event.confirm.resolve(event.newData);
        this.serviceM.update(event.newData).subscribe(obj => {
          this.initM();
        });
        window.alert('les donnes sont change avec succes');
      });
    }
  }
  onDeleteMedcin(event) {
    if (this.isAdmin) {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve(event.data);
        this.serviceM.delete(event.data.id).subscribe(data => {
          console.log(data);
          this.initM();
        });
      } else {
        event.confirm.reject(event.data);
      }
    }
  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }
  getAgeParAnnee(DateNaiss , DateDeces ) {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 31536000000).toFixed(0);
  }

  private getDocumentDefinition() {

    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  text: 'ROYAUME DU MAROC \n MINISTERE DE LA SANTE PUBLIQUE',
                  fontSize: 10,
                  alignment: 'left',
                  border: [true, true, false, false],
                },
                {
                  text: 'Province/ préfecture ' + this.Bulletins.province + '\n Cercle ' + this.Bulletins.cercle +
                    '\n Municipalité /centre/commune ' + this.Bulletins.centre,
                  fontSize: 10,
                  border: [false, true, true, false],
                },
              ],
              [
                {
                  colSpan: 2,
                  text: 'BULLETIN DE DECES ET DE MORTINATALITE',
                  fontSize: 20,
                  alignment: 'center',
                  margin: [0, 10, 0, 20],
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  fontSize: 12,
                  text: 'Décès survenu le:  ' + this.jstoday + ' à  '  + this.h + ' heure à  ' + this.l + '  \n' + 'Nom et prénom de décédé:  ' + this.n + ' ' + this.p +
                    '\n' + 'Sexe:   ' + this.s + '  Nationalite: ' + this.na
                  + '\n Domicile  ' + this.a + '\n age:  ' + this.getAgeParAnnee(this.dn, this.dd) + '  \n ',
                },
                '',
              ],
              [
                {text: '',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                  fontSize: 9,
                  text: 'Le Docteur en médecine soussigné \n nom signature \n\n',
                  alignment: 'center',
                },
              ],
              [
                {
                  text: 'N° de l\'acte au registre des décès ' + this.Bulletins.remarque +
                    '\n de l\'hopital/ DMH/Commune ',
                  colSpan: 2,
                  fontSize: 12,
                  border: [true, false, true, true],
                },
                '',
              ],
            ],
          },
        },
        {
          text: '\n\n',
        },
        {
          table: {
            widths: ['30%' , '70%'],
            body: [
              [
                {
                  colSpan: 2,
                  text: 'PARTIE ANONYME \n' +
                    'DESTINEE AU MINISTERE DE LA SANTE PUBLIQUE? SERVICE DES ETUDES \n ET DE L\'INFORMATION SANTAIRE',
                  alignment: 'center',
                  fontSize: 10,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: 'I- IDENTIFICATION',
                  decoration: 'underline',
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  text: 'N° de l\'acte au registre  ' + this.Bulletins.remarque + '  N° de compostage: \n\n Lieu de déclaration:',
                  border: [true, false, false, false],
                },
                {border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.Bulletins.province,
                    'Cercle: ' + this.Bulletins.cercle,
                    'Municipalité /Centre/ Commune: ' + this.Bulletins.centre,
                  ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Domicile habituel:',
                },
                {border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.prov,
                    'Cercle: ' + this.Pre,
                    'Municipalité /Centre/ Commune: ' + this.CD,
                  ],
                },
              ],
              [
                {
                  colSpan: 2,
                  text: 'Milieu de résidnce:' + this.Bulletins.residece,
                  border: [true, false, true, true],
                },
                '',
              ],
              [
                  {
                    colSpan: 2,
                    text: 'II- CARACTERISTIQUES \n\n',
                    decoration: 'underline',
                    bold: true,
                    border: [true, false, true, false],
                  },
                  '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Type de bulletin : ' + this.Bulletins.typeBulletin + '\n Date de décès  ' + this.jstoday + '\n'
                  + 'Lieu où de décès est servenu :' + this.l ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Sexe :' + this.s ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Age :' + this.getAgeParAnnee(this.dn, this.dd),
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Nationalité :' + this.na ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Etat matrimonial :' + this.e ,
                },
                '',
              ], [
                {
                  colSpan: 2,
                  border: [true, false, true, true],
                  text: 'Profession :' + this.pr ,
                },
                '',
              ],
            ],
          },
        },
        {
          text: '\n',
          margin: [0, 300, 0, 300],
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  colSpan: 2,
                 text: 'III- RENSEIGNEMENTS SUR LA CAUSE DU DECES OU DE MORTINATALITE',
                  border: [true, true, true, false],
                  decoration: 'underline',
                  bold: true,
                },
                '',
              ],
              [
                {
                  text: 'Mort naturelle',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                 ul: [
                   'Cause immédiate' + this.cim,
                   'Cause initiale', + this.cini,
                 ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Mort non naturelle \n',
                },
                {
                  border: [false, false, true, false],
                  ul: [
                    'Nature de traumatisme',
                    'Nature d\'intoxication',
                    'Autre',
                  ],
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  colSpan: 2,
                  text: 'Constatation faite par ' + this.constation,
                },
                '',
              ],
            ],
          },
        },
       ],
      styles: {
        name: {
          fontSize: 16,
          bold: true,
        },
      },
    };
  }
n: string;
  p: string;
  dd: Date;
  h: string;
  s: string;
  na: string;
  a: string;
  dn: Date;
  numR: string;
  l: string;
  e: string;
  pr: string;
  cim: string;
  cini: string;
  CD: string;
  Pre: string;
  prov: string;
  jstoday = '';
  add() {
    this.serviceD.getByNumRegister(this.Bulletins.remarque).subscribe(obj => {
      this.DecedeHumain.push(new DecedesList(obj));
      this.l = obj.lieuxDeces;
      this.n = obj.nom;
      this.p = obj.prenom;
      this.dd = obj.dateDeces;
      this.jstoday = formatDate(this.dd, 'dd-MM-yyyy', 'en-US', '+0530');
      this.h = obj.heure;
      this.s = obj.sexe;
      this.na = obj.nationalite;
      this.na = obj.nationaliteAR;
      this.a = obj.adresse;
      this.dn = obj.dateNaissance;
      this.numR = obj.NumRegister;
      this.e = obj.Etat;
      this.pr = obj.profession;
      this.cim = obj.causeImmdiate;
      this.cini = obj.causeInitial;
      this.CD = obj.communeD;
      this.Pre = obj.prefectureD;
      this.prov = obj.provinceD;
    });
  }
}
