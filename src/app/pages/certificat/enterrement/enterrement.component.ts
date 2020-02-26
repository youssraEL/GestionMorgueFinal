import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {CertificatEnterrement} from '../../../@core/backend/common/model/CertificatEnterrement';
import {CertificatEnterrementService} from '../../../@core/backend/common/services/CertificatEnterrement.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';

@Component({
  selector: 'ngx-enterrement',
  templateUrl: './enterrement.component.html',
  styleUrls: ['./enterrement.component.scss'],
  providers: [CertificatEnterrementService, UsersService, DecedesService, MedecinsService],
})
export class EnterrementComponent implements OnInit {
  Enterrement: CertificatEnterrement = new CertificatEnterrement();
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
      ville: {
        title: 'ville',
        type: 'string',
      },
      declaration: {
        title: 'Date declaration',
        type: 'Date',
      },
    },
  };
  private source: CertificatEnterrement;
  NomDecede = [];
  DefuntId: number;
  constructor(private service: CertificatEnterrementService, private userservice: UsersService,
              private serviceDecede: DecedesService, private serviceM: MedecinsService) {
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
    this.service.getAll().subscribe(data => {
      console.log(data);
      this.service.create(this.Enterrement).subscribe(obj => {
        this.init();
      });
      this.reset();
      this.init();
      window.alert('Les données ont été ajoutées avec succès à la base de données');
      this.init();
    });
  }

  private reset() {
    this.Enterrement = new CertificatEnterrement();
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
