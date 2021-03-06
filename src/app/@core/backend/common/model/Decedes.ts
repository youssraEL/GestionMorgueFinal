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
  natureMort: string;
  causeMort: string;
  causeInitial: Cause;
  causeImmdiate: Cause;
  lieuxDeces: string;
  Etat: string;
  obstacle: boolean;
  numRegister: string;
  typeCertifica: string;
  provinceD: string;
 prefectureD: string ;
  communeD: string;
NomAR: string;
PrenomAR: string;
LieuNaiss: string;
LieuDecesAR: string;
nationaliteAR: string;
FilsAR: string;
  adresseAR: string;
Autopsie: string;
   operation: string;
   ageMere: string;
   AgeGestationnel: string;
   GrossesseMultiple: string;
   PoidsNaissance: string;
   decesGrossesse: string;
   decesFemme: string;
   ContribueGros: string;
   maladie: string;
DateServ: Date;
   LieuServ: string;
   CirconServ: string;
   resultatsAutopsie: string;
dateOperation: Date;
   MotifOperation: string;
  constructor() {
  }
}
