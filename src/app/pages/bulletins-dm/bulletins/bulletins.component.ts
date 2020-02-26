import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'ngx-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss'],
  providers: [ BulletinsService, DecedesService, MedecinsService],
})

export class BulletinsComponent implements OnInit {
  Bulletins: Bulletins = new Bulletins();
  typeBulletin = ['Bulletin de décès', 'Bulletin de mortinalité'];
  Milieu = ['Urbain', 'Rural', 'Inconnu'];
  Lieu = ['Tanger', 'Asila', 'Tetouan'];
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
    this.service.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.service.create(event.newData).subscribe(obj => {});
     // this.init();
    });
  }
  onEditConfirm(event) {
    this.service.getAll().subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.service.update(event.newData).subscribe(obj => {
      });
      window.alert('les donnes sont change avec succes');
    });
  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve(event.data);
      this.service.delete(event.data.id).subscribe(data => {
        console.log(data);
      });
    } else {
      event.confirm.reject(event.data);
    }
  }
  createConfirmD(event) {
    this.serviceD.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.serviceD.create(event.newData).subscribe(obj => {});
       this.initD();
    });
  }
  onEditConfirmD(event) {
    this.serviceD.getAll().subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.serviceD.update(event.newData).subscribe(obj => {
        this.initD();
      });
      window.alert('les donnes sont change avec succes');
    });
  }
  onDeleteConfirmD(event) {
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
  createMedcin(event) {
    this.serviceM.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.serviceM.create(event.newData).subscribe(obj => {});
      this.initM();
    });
  }
  onEditMedcin(event) {
    this.serviceM.getAll().subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.serviceM.update(event.newData).subscribe(obj => {
        this.initM();
      });
      window.alert('les donnes sont change avec succes');
    });
  }
  onDeleteMedcin(event) {
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
