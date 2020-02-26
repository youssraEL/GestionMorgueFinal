import { Component, OnInit } from '@angular/core';
import {ApercuCorps} from '../../../@core/backend/common/model/ApercuCorps';
import {ApercuCorpsService} from '../../../@core/backend/common/services/ApercuCorps.service';
import {LocalDataSource} from 'ng2-smart-table';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
@Component({
  selector: 'ngx-apercu-du-corp',
  templateUrl: './apercu-du-corp.component.html',
  styleUrls: ['./apercu-du-corp.component.scss'],
  providers: [ApercuCorpsService, UsersService, MedecinsService, DecedesService],
})
export class ApercuDuCorpComponent implements OnInit {
  ApercuCorps: ApercuCorps = new ApercuCorps();
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
      defunt: {
        title: 'Defunt',
        type: 'Decedes',
      },
  CenterMedicoLegal: {
        title: 'Centre médico-Légal',
        type: 'string',
      },
      Medecin: {
        title: 'Medcin',
        type: 'Medecins',
      },
      dateDeclaration: {
        title: 'date declaration',
        type: 'Date',
      },
    },
  };
  NomMedcin = [];
  NomDecede = [];
  private source: ApercuCorps;
  MedecinID: number;
  constructor(private service: ApercuCorpsService, private userservice: UsersService,
              private serviceMedcin: MedecinsService, private serviceDecede: DecedesService ) {
    this.serviceMedcin.getAll().subscribe( data => {
      data.forEach ( obj => { this.NomMedcin.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id}); });
    });
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
    });
    this.init();
  }

  save() {
      this.serviceMedcin.getById(this.MedecinID).subscribe(obj => {
        this.ApercuCorps.Medecin = obj;
      console.log(this.ApercuCorps);
      this.service.create(this.ApercuCorps).subscribe(data => {});
      this.init();
      });
      this.init();
      window.alert('Les données ont été ajoutées avec succès à la base de données');
    this.init();
  }

  private reset() {
    this.ApercuCorps = new ApercuCorps();
  }
  createConfirm(event) {
    this.service.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.service.create(event.newData).subscribe(obj => {});
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
