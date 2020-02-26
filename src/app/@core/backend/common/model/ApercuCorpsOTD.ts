import {Medecins} from './Medecins';

export class ApercuCorpsOTD {
  id: number;
  defunt: string;
  CenterMedicoLegal: string;
  dateDeclaration: Date;
  Medecin:  string ;


  constructor(id: number, defunt: string, CenterMedicoLegal: string, dateDeclaration: Date, Medecin: string) {
    this.id = id;
    this.defunt = defunt;
    this.CenterMedicoLegal = CenterMedicoLegal;
    this.dateDeclaration = dateDeclaration;
    this.Medecin = Medecin;
  }
}
