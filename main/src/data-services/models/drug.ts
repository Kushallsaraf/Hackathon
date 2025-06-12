import { mixin, snakeCaseMappers } from 'objection';

import schema from './schemas/drug.json';
import { BaseModel } from './base-model';

export class Drug extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'drugs';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model fields
  public barCode!: string;
}
