import {Cause} from './Cause';
import {Decedes} from './Decedes';

export class DecedesList {
  id: number;
  CIN: string;
  heure: string;
  prenom: string;
  nom: string;
  sexe: string;
  dateNaissance: Date;
  adresse: string;
  nationalite: string;
  fils: string;
  mortNe: boolean;
  profession: string;
  dateDeces: Date;
  natureMort: Date;
  causeMort: string;
  causeInitial: Cause;
  causeImmdiate: Cause;
  lieuxDeces: string;
  Etat: string;
  obstacle: boolean;
  NumRegister: string;
  typeCertifica: string;

  constructor(decede: Decedes ) {
    this.id = decede.id;
    this.CIN = decede.CIN;
    this.heure = decede.heure;
    this.prenom = decede.prenom;
    this.nom = decede.nom;
    this.sexe = decede.sexe;
    this.dateNaissance = decede.dateNaissance;
    this.adresse = decede.adresse;
    this.nationalite = decede.nationalite;
    this.fils = decede.fils;
    this.mortNe = decede.mortNe;
    this.profession = decede.profession;
    this.dateDeces = decede.dateDeces;
    this.natureMort = decede.natureMort;
    this.causeMort = decede.causeMort;
    this.causeInitial = decede.causeInitial;
    this.causeImmdiate = decede.causeImmdiate;
    this.lieuxDeces = decede.lieuxDeces;
    this.Etat = decede.Etat;
    this.obstacle = decede.obstacle;
    this.NumRegister = decede.NumRegister;
    this.typeCertifica = decede.typeCertifica;
  }
}
