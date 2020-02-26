import { Component, OnInit } from '@angular/core';
import {CertificatTransfertCorps} from '../../../@core/backend/common/model/CertificatTransfertCorps';
import {CertificatTransfertCorpsService} from '../../../@core/backend/common/services/CertificatTransfertCorps.service';
import {LocalDataSource} from 'ng2-smart-table';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {Decedes} from '../../../@core/backend/common/model/Decedes';

@Component({
  selector: 'ngx-transfert-corps',
  templateUrl: './transfert-corps.component.html',
  styleUrls: ['./transfert-corps.component.scss'],
  providers: [CertificatTransfertCorpsService, UsersService, DecedesService, MedecinsService ],
})
export class TransfertCorpsComponent implements OnInit {
  cercueil = ['En zinc et bois', 'En bois'];
  destinationCorps = ['tanger', 'Rabat'];
  trnsfrCorps: CertificatTransfertCorps = new CertificatTransfertCorps();
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
      Declarant: {
        title: 'Declarant',
        type: 'string',
      },
      CIN: {
        title: 'CIN',
        type: 'string',
      },
  declaration: {
        title: 'Date declaration',
        type: 'Date',
      },
  Destination: {
        title: 'Destination',
        type: 'string',
      },
  cercueilType: {
        title: 'Type cercueil',
        type: 'string',
      },
  tel: {
        title: 'Tel',
        type: 'number',
      },
      mortuaire: {
        title: 'Fourgon mortuaire',
        type: 'string',
      },
      inhumationSociete: {
        title: 'Societe d\'inhumation',
        type: 'string',
      },
      medecins: {
        title: 'Médcin',
        type: 'Medecins',
      },
      defunt: {
        title: 'Defunt',
        type: 'Decedes',
      },
      remarque: {
        title: 'Remarque',
        type: 'string',
      },
    },
  };
  private source: CertificatTransfertCorps;
  defauntID: number;
  MedcinID: number;
  NomMedcin = [];

  constructor(private service: CertificatTransfertCorpsService, private serviceM: MedecinsService,
              private userservice: UsersService, private serviceDecede: DecedesService) {
    this.serviceDecede.getAll().subscribe( dataa => {
      dataa.forEach (  obj => { this.NomDecede.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id}); });
    });
    this.serviceM.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.NomMedcin.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id}); });
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
    this.serviceM.getById(this.MedcinID).subscribe(obj => {
      this.trnsfrCorps.medecins = obj;
      this.serviceDecede.getById(this.defauntID).subscribe(objj => {
        this.trnsfrCorps.defunt = objj;
      console.log(this.trnsfrCorps);
      this.service.create(this.trnsfrCorps).subscribe(data => {
        this.init();
      }); });
    });
    this.init();
    window.alert('Les données ont été ajoutées avec succès à la base de données');
    this.init();
    //   this.serviceM.getById(this.MedcinID).subscribe(objj => {
    //     this.trnsfrCorps.medecins = objj;
    //     this.serviceDecede.getById(this.defauntID).subscribe(obj1 => {
    //       this.trnsfrCorps.defunt = obj1;
    //   this.service.create(this.trnsfrCorps).subscribe(data => {}); });
    //   this.reset();
    //   window.alert('Les données ont été ajoutées avec succès à la base de données');
    //   this.init();
    // }); });
  }

  private reset() {
    this.trnsfrCorps = new CertificatTransfertCorps();
  }
  // init() {
  //     this.source = data;
  //   });
  // }

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
    if (window.confirm('Etes-vous sûr que vous voulez supprimer?')) {
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
