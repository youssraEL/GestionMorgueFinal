import {Medecins} from './Medecins';
import {Decedes} from './Decedes';

export class CertificatMedicoLegal {
id: number;
medecin: Medecins ;
declarant: string;
address: string;
 CIN: string;
declaration: Date;
defunt: Decedes ;
  constructor() {
  }
}
