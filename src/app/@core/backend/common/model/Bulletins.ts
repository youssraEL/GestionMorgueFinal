import {Medecins} from './Medecins';
import {Decedes} from './Decedes';

export class Bulletins {

id: number;
typeBulletin: number;
declaration: Date;
cercle: string;
diagnostique: string;
LieuEntrement: string;
province: string;
residece: string;
cimetiere: string;
NumTombe: number;
compostage: string;
medecin: Medecins;
decede: Decedes;
centre: string;
  constructor() {
  }
}
