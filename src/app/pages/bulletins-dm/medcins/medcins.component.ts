import { Component, OnInit } from '@angular/core';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {LocalDataSource} from 'ng2-smart-table';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-medcins',
  templateUrl: './medcins.component.html',
  styleUrls: ['./medcins.component.scss'],
  providers: [MedecinsService],
})
export class MedcinsComponent implements OnInit {
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
  // source: LocalDataSource = new LocalDataSource();
  medcin: Medecins = new Medecins();
  private source: Medecins;

  constructor(private service: MedecinsService, private userservice: UsersService) { }

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  isAdmin: boolean;
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      console.log(data);
      console.log(data.role);
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
  }

  data: any;
  save() {
    this.service.getAll().subscribe(data => {
      console.log(data);
        this.service.create(this.medcin).subscribe(obj => {
          this.init();
        });
        this.reset();
        window.alert('Les données ont été ajoutées avec succès à la base de données');
        this.init();
    });
  }

  private reset() {
    this.medcin = new Medecins();
  }

  createConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.create(event.newData).subscribe(obj => {
        });
        this.init();
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
        this.init();
      });
    }
  }
  onDeleteConfirm(event) {
    if (this.isAdmin) {
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
}
