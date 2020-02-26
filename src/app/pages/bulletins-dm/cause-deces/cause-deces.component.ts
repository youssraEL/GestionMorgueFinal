import { Component, OnInit } from '@angular/core';
import { Cause} from '../../../@core/backend/common/model/Cause';
import {LocalDataSource} from 'ng2-smart-table';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-cause-deces',
  templateUrl: './cause-deces.component.html',
  styleUrls: ['./cause-deces.component.scss'],
  providers: [ CauseService, UsersService],
})
export class CauseDecesComponent implements OnInit {
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
      code: {
        title: 'Code',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  Cause: Cause = new Cause();
  private source: Cause;
  private lise: number;
  constructor(private service: CauseService, private userservice: UsersService ) { }

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  initID() {
    this.service.getID().subscribe(data => {
      this.lise = data;
    });
  }

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      console.log(data);
      console.log(data.role);
    });
    this.init();
  }

  data: any;
  save() {
    this.service.getAll().subscribe(data => {
      console.log(data);
      if (1 === 1 ) {
        this.service.create(this.Cause).subscribe(obj => {
          this.init();
        });
        this.reset();
        this.init();
        window.alert('Les données ont été ajoutées avec succès à la base de données');
      } else {
        window.alert('Erreur ...');
      }
    });
  }

  private reset() {
    this.Cause = new Cause();
  }
  // createConfirm(event) {
  //   this.service.getAll().subscribe(data => {
  //     event.confirm.resolve(event.newData);
  //     this.service.create(event.newData).subscribe(obj => {});
  //   });
  //   this.init();
  // }

  createConfirm(event) {
    this.service.getAll().subscribe(data => {
      event.confirm.resolve(event.newData);
      this.service.create(event.newData).subscribe(obj => {});
      this.init();
    });
    this.init();
  }

  onEditConfirm(event) {
    this.service.getAll().subscribe(data => {
      console.log(data);
      event.confirm.resolve(event.newData);
      this.service.update(event.newData).subscribe(obj => {
      });
      this.init();
      window.alert('les donnes sont change avec succes');
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
