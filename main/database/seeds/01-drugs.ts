import { Knex } from 'knex';
import { v4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('drugs').del();

  // Inserts seed entries
  await knex('drugs').insert([
    {
      id: v4(),
      barcode: '0710500367014',
      drug: 'Tylenol',
      quantity: '100',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: v4(),
      barcode: '0305730125604',
      drug: 'Advil',
      quantity: '1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: v4(),
      barcode: '0791484264728',
      drug: 'Aspirin',
      quantity: '10',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
