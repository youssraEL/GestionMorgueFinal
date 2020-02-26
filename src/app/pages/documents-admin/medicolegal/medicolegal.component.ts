import { Component, OnInit } from '@angular/core';
import {CertificatMedicoLegalService} from '../../../@core/backend/common/services/CertificatMedicoLegal.service';
import {CertificatMedicoLegal} from '../../../@core/backend/common/model/CertificatMedicoLegal';
import {LocalDataSource} from 'ng2-smart-table';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';

@Component({
  selector: 'ngx-medicolegal',
  templateUrl: './medicolegal.component.html',
  styleUrls: ['./medicolegal.component.scss'],
  providers: [ CertificatMedicoLegalService, UsersService, DecedesService, MedecinsService],
})
export class MedicolegalComponent implements OnInit {
  Medicolegal: CertificatMedicoLegal = new CertificatMedicoLegal();
NomMedecin = [];
  NomDecede = [];
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
      medecin: {
        title: 'Médcin',
        type: 'Medecins',
      },
      declarant: {
        title: 'Déclarant',
        type: 'string',
      },
      address: {
        title: 'Adresse',
        type: 'string',
      },
      CIN: {
        title: 'CIN',
        type: 'string',
      },
      declaration: {
        title: 'Date de déclaration',
        type: 'Date',
      },
      defunt: {
        title: 'defunt',
        type: 'Decedes',
      },
    },
  };
  private source: CertificatMedicoLegal;

  constructor(private service: CertificatMedicoLegalService, private userservice: UsersService,
  private serviceDecede: DecedesService, private serviceMeddcin: MedecinsService) {
    this.serviceDecede.getAll().subscribe( dataa => {
      dataa.forEach (  obj => { this.NomDecede.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id}); });
    });
    this.serviceMeddcin.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.NomMedecin.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id}); });
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

  MedNom: number;
  private reset() {
    this.Medicolegal = new CertificatMedicoLegal();
  }
  defunt: number;
  save() {
    this.serviceMeddcin.getById(this.MedNom).subscribe(obj => {
      this.Medicolegal.medecin = obj;
      this.serviceDecede.getById(this.defunt).subscribe(objj => {
        this.Medicolegal.defunt = objj;
      console.log(this.Medicolegal);
      this.service.create(this.Medicolegal).subscribe(data => {
        this.init();
      }); }); });
    window.alert('Les données ont été ajoutées avec succès à la base de données');
    this.init();
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
}
