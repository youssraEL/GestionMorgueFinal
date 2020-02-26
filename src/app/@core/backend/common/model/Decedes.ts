import {Cause} from './Cause';

export class Decedes {
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
  typeCertifica: string;
  constructor() {
  }
}
