import { Drug } from '../models';
import { DataService } from './data-service';

export class DrugDataService extends DataService {
  constructor() {
    super(Drug);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public getByBarCode = (barCode: string) => this.model.query().findOne({ barCode });
}
