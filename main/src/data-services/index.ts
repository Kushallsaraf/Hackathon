import { DrugDataService } from './services/drug-data-service';

import { Database } from '../lib/database';

// Instantiate database when importing data service.
// TODO(ikeviny): Ensure singleton constructor?
new Database();

export const ds = {
  drug: new DrugDataService(),
};
