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
  medcinid: number;
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
  ListNum = [];
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
  private source: Bulletins;
  numRgtr: number;
  isAdmin: boolean;
  DecedeHumain: Decedes;
  NomDecede = [];
  NomDMedcin = [];

  constructor(private service: BulletinsService, private serviceD: DecedesService, private serviceM: MedecinsService,
              private serviceS: SmartTableData, private userservice: UsersService ) {
    this.serviceD.getAll().subscribe( dataa => {
      dataa.forEach (  obj => { this.NomDecede.push({nom: obj.nom, prenom: obj.prenom, id: obj.id, numRegister: obj.numRegister}); });
   console.log(this.NomDecede);
    });
    this.serviceM.getAll().subscribe( dataa => {
      dataa.forEach (  obj => { this.NomDMedcin.push({nom: obj.nom, prenom: obj.prenom, id: obj.id}); });
      console.log(this.NomDMedcin);
    });
      this.MedecinHumain = new Medecins();
      this.DecedeHumain = new Decedes();
  }


  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      console.log(data);
      console.log(data.role);
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
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
                  text: 'Décès survenu le:  ' + this.DecedeHumain.dateDeces + ' à  '  + this.DecedeHumain.heure + ' heure à  ' + this.DecedeHumain.lieuxDeces + '  \n' + 'Nom et prénom de décédé:  ' + this.DecedeHumain.nom + ' ' + this.DecedeHumain.prenom +
                    '\n' + 'Sexe:   ' + this.DecedeHumain.sexe + '  Nationalite: ' + this.DecedeHumain.nationalite
                  + '\n Domicile  ' + this.DecedeHumain.adresse + '\n age:  ' + this.getAgeParAnnee(this.DecedeHumain.dateNaissance, this.DecedeHumain.dateDeces) + '  \n ',
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
                  text: 'N° de l\'acte au registre des décès ' + this.numRgtr +
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
                  text: 'N° de l\'acte au registre  ' + this.numRgtr + '  N° de compostage:' + this.compostage,
                  colSpan: 2,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  text: 'Lieu de déclaration:',
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
                    'Province ou Prefecture: ' + this.DecedeHumain.provinceD,
                    'Cercle: ' + this.DecedeHumain.prefectureD,
                    'Municipalité /Centre/ Commune: ' + this.DecedeHumain.communeD,
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
                  + 'Lieu où de décès est servenu :' + this.DecedeHumain.lieuxDeces ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Sexe :' + this.DecedeHumain.sexe ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Age :' + this.getAgeParAnnee(this.DecedeHumain.dateNaissance, this.DecedeHumain.dateDeces),
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Nationalité :' + this.DecedeHumain.nationalite ,
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  border: [true, false, true, false],
                  text: 'Etat matrimonial :' + this.DecedeHumain.Etat ,
                },
                '',
              ], [
                {
                  colSpan: 2,
                  border: [true, false, true, true],
                  text: 'Profession :' + this.DecedeHumain.profession ,
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
                   'Cause immédiate' + this.DecedeHumain.causeImmdiate,
                   'Cause initiale', + this.DecedeHumain.causeInitial,
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
                  text: 'Constatation faite par ' + this.MedecinHumain.nom + ' ' + this.MedecinHumain.prenom,
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

  jstoday = '';
  MedecinHumain: Medecins;
  i = 0;
  add() {
    if ( this.i !== 1) {
      this.serviceD.getByNumRegister(this.numRgtr).subscribe(obj => {
        this.DecedeHumain = obj;
        this.jstoday = formatDate(this.DecedeHumain.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530');
        console.log(this.DecedeHumain);
      });
    this.serviceM.getById(this.medcinid).subscribe(obj1 => {
        this.MedecinHumain = obj1;
      });
      this.i = 1;
    }
  }
}
