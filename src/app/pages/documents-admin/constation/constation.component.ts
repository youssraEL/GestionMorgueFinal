import { Component, OnInit } from '@angular/core';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {formatDate} from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-constation',
  templateUrl: './constation.component.html',
  styleUrls: ['./constation.component.scss'],
  providers: [ DecedesService, UsersService, CauseService],
})
export class ConstationComponent implements OnInit {
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
  today = new Date();
  jstoday = '';
  constructor(private service: DecedesService, private userservice: UsersService, private serviceCause: CauseService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
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
isAdmin: boolean;

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

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  private getDocumentDefinition() {

    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 50,
          height: 50,
          image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFhUXGR4ZGBgXFyAgHRgeGxgaHhcYGBgbHighGhonHhgWJTElJikrLjAuHSA1ODMtOCgtLi0BCgoKDg0OGxAQGy0lICUvLi8uMjItLy0wMDAtLTAvMS4tLS8tLS0tLy0yLTAvLS01LS0wLS0tLS0tLS0vLS0tLf/AABEIAOoA2AMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwcCAf/EAEMQAAEDAgMGBAUBBgIIBwAAAAEAAhEDIQQSMQUGIkFRYRNxgZEyQlKhscEUYnKS0fCi4QcVFiNDg7LSJDNTY4Kzwv/EABsBAQADAQEBAQAAAAAAAAAAAAADBAUCBgEH/8QAPBEAAQMCBAQEBQMDAwMFAQAAAQACAwQREiExQQVRYXETIoHwkaGxwdEUMuEjQvEGFVJyorIWU2LC0jP/2gAMAwEAAhEDEQA/APcURERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERRdoY9tFoc8OyzEgTHSeijllbE3G/TsT9F01pcbBZihvOz9qfUJPguYGNd1Lb6TyzPuJ1CofrmiYudfBb/AIu1GfLcH/tzUvheWw17j3/lanA4ttVoe0OynSRE9x1HdaEcge0OGh6W+qhIsbFSF2viIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiqNqbdoUnGlUMnKSREiI0I1NugOt1Vlq4o5BG45nod/lmpGxuIxBeeYfHszMa6pmDamc0stup8yYgi+ncrJjDvKNsX7dhnnY2sSBew05EnJXXQvDPEwkA/3L0jZm2qNdzmUzJbfTl17ajWDda8FXFOSGG9uh+XNUXxuZqFZKyuERERERERERERERERERERERERERERERERERERERERERF8moAQCRJ0E3PWAiKkwm9FGrjKmDZmNSm3MXQMhs2QCDNszeXVN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wzNOUtc4nMHQ6C6cszEgWmRYWHJfGmE2PIaajTX15c0IcMlIwWGyy4mS4lzjpmJiJHIANaAOQAm6jknIGFuQtb01t1uczzPRdBm5V5snZD69/hYLF0anmGjn56DvcK9w7hDqgY35N+Z7dOqhmqAzIZlXb91qcWqVAepykeoyj8rcdwOlIsLjrdVRVyXVXsrDltd+GqXa4FrwNJDczHjoYj37Knw+J8NRJSPzba/vle+fVSzODmCQZFafZGFNKiym4yQLkcySSfyt+CIRRtjGwsqb3YnEqYpVyiIiIiIiIiIiIoVPZrW1zWaSC5sObyJlvEOhhsf0vMLYGtkMg1Nr+mi6LyW4VNUy5XDGYVtRhY8SD/YIPIqOSNsjS14uCvrXFpuFidrbKfRMO4mGwdFj2d0d9jy6DxvEOFyUrsbM289x3/K04Zw8WOqrW4doteOhcT7gm6zDI4m/2CmwhfdHMx9M05zZgGiSZOrYnS49iVcoHvNQzDrcfWx+RXEoGA3XpNSmHAhwBB1BEg+hXvLLIVPjN2qLrsmme12/ynQdgQsyo4RSzZ4cJ6ZfLT5KdlTI3e6q6u7FYfC6m7zJb9od+VlSf6eeP2PB7i30urArBuFy/wBmsR/7f85/7FF/6fn/AOTfn+F1+sZyK+6e6Ty7M40mu+oAuI66hp+6sx8Bfaz5MuQH8/ZcGrGoarbC7s0m3eXVD0JhvsNR2JK0YOD0sWdsR65/LT5KB9TI7eysq9PJScKTQCGnKAIEwYgDutIizfKoRrmvN6TQ4Sb3NjpYkade6/O5XPDjfXfnfdbLQCF+uw7eYsLxJj2mFyJXhfcIV5sXYjqxDny2n7F/ZvQd/bqNzhvBy8iWYeXYc+/T6qpPUgeVq2VOmGgNaAABAA0AGgAXqwLaLPX0vqKFQ2c1tZ9aSXPgX0aAGiB55QTKhbAwSGTc2HoF0XktDdlNUy5REREREREREREREREREREXy9gIIIkHUHmiKpr7t0HGRmZ/CbexBA9FnS8KpJDcssemX0yU7aiRuV122fsSlSOYAudyc6CR5QAB7KWmoYKa5jGfPdcPle/UqyVxRoiIiIiIiIiIiKqxu79Go7NdhNyWQJ7kEET3VGp4bT1DsT258xkpWTvYLAphN36DDOUvPV5n7WH2SDh1NAcTG58zn9UfM92RKtVeUSIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi/9k=',
        },
        {
          text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN' +
            ' \n COMMUNE URBAINE DE TANGER \n SERVICE DE LA MORGUE',
          style: 'header',
        },
        {
          text: 'CERTIFICAT DE CONSTATION DE DECES',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          text: 'je soussigné Le médecin chef de la registre d\'Hygiène' +
            ' et de controle sanitaire certifie avoir constatélr de décès ',
          bold: true,
          margin: [0, 10, 0, 20],
        }, {
          columns: [
            {
              text: 'Nom : ' , style: 'style',
            },
            {
              text: this.decede.nom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Nationalité : ', style: 'style',
            },
            {
              text: this.decede.nationalite, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de naissance : ', style: 'style',
            },
            {
              text: this.decede.dateNaissance, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Sexe : ', style: 'style',
            },
            {
              text: this.decede.sexe, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Domicile : ' , style: 'style',
            },
            {
              text: this.decede.adresse, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Lieux de décès : ' ,  style: 'style',
            },
            {
              text: this.decede.lieuxDeces, style: 'style',
            },
          ],
        },
        {
          columns: [
              {
                text: 'à Cause de : ', style: 'style',
              },
              {
                text: this.decede.natureMort, style: 'style',
              },
          ],
        },
              {
                text: 'Fait à Tanger le :' + this.jstoday,
                alignment: 'right',
                fontSize: 12,
                margin: [20, 30, 70, 5],
              },
        ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 10, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }
}
