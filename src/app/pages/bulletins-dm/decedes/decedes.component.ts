
import { Component, OnInit } from '@angular/core';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {LocalDataSource} from 'ng2-smart-table';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';

@Component({
 selector: 'ngx-decedes',
   templateUrl: './decedes.component.html',
 styleUrls: ['./decedes.component.scss'],
  providers: [ DecedesService, UsersService, CauseService],
})
export class DecedesComponent implements OnInit {
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
        type: 'date',
      },
      heure: {
        title: 'date décès',
        type: 'string',
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
        type: 'Cause',
        editable: false,
      },
      causeImmdiate: {
        title: 'Cause immédiate',
        type: 'Cause',
        editable: false,
      },
      obstacle: {
        title: 'Obstacle medicolégal',
        type: 'boolean',
      },
    },
  };
  sexe = ['Femme', 'Homme', 'indéterminé'];
 Etat = ['Célibataire', 'Marié', 'Divorcé', 'Veuf(ve)'];
 LieuD = ['Domicile', 'Hopital public', 'Clinique', 'Voie public', 'Lieu de travail', 'Autre'];
  NatureMort = ['Mort naturel', 'Mort non naturel'];
  CauseMort = ['accident', 'homicide', 'suicide', 'inconnu', 'noyade', 'brûlure', 'intoxication', 'traumatisme'];
  couseIni = [];
  private source: Decedes;

  constructor(private service: DecedesService, private userservice: UsersService, private serviceCause: CauseService) {
    this.serviceCause.getAll().subscribe( data => {
      data.forEach ( obj => { this.couseIni.push({code: obj.code , id: obj.id}); });
    });
   //  this.serviceCause.getAll().subscribe( dataa => {
   // dataa.forEach ( obj => { this.couseIni.push(obj.code); });
   //  });
  }
  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  // source: LocalDataSource = new LocalDataSource();
  decede: Decedes = new Decedes();
  initialeID: number;
  immediateID: number;

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      console.log(data);
      console.log(data.role);
    });
    this.init();
  }
  save() {
    this.serviceCause.getById(this.initialeID).subscribe(obj => {
      this.decede.causeInitial = obj;
      this.serviceCause.getById(this.immediateID).subscribe(obj1 => {
        this.decede.causeImmdiate = obj1;
      console.log(this.decede);
      this.service.create(this.decede).subscribe(data => {
        this.init();
      }); });
    });
    this.init();
    window.alert('Les données ont été ajoutées avec succès à la base de données');
    this.init();
  }

  private reset() {
    this.decede = new Decedes();
  }


  createConfirm(event) {
    this.service.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.service.create(event.newData).subscribe(obj => {
      });
      this.init();
    });
  }

  onEditConfirm(event) {
    this.service.getAll().subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.service.update(event.newData).subscribe(obj => {
      });
      window.alert('les donnes sont change avec succes');
      this.init();
    });
  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve(event.data);
      this.service.delete(event.data.id).subscribe(data => {
        console.log(data);
        this.init();
      });
    } else {
      event.confirm.reject(event.data);
    }
  }
}
