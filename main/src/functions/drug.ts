import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import axios from 'axios';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { ds } from '../data-services';
import { okReturn } from '../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../lib/types';
import { drugCreateSchema as eventSchema } from './schemas';

interface drugBody {
  barcode: string;
}
const getGeneric = async (name: string) => {
  const url = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${name}`;
  const response = await axios.get(url);
  const data = response.data;

  if (data.drugGroup && data.drugGroup.conceptGroup) {
    // First look for ingredient (tty: 'IN') concept group
    const ingredientGroup = data.drugGroup.conceptGroup.find((group: any) => group.tty === 'IN');

    if (ingredientGroup?.conceptProperties) {
      return { genericName: ingredientGroup.conceptProperties[0].name };
    }

    // Fallback to original search if no ingredient group found
    for (const group of data.drugGroup.conceptGroup) {
      if (group.conceptProperties) {
        for (const concept of group.conceptProperties) {
          if (concept.name) {
            // Extract first part of the name before any slash or dosage
            const match = concept.name.match(/^([^/]+?)\s*\d/);
            if (match) return { genericName: match[1].trim() };
          }
        }
      }
    }
  }
};

// TODO(ikeviny): APIGatewayProxyWithCognitoAuthorizerEvent
const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised<drugBody>, _context: Context): Promise<APIGatewayProxyResult> => {
  const { barcode } = event.body;
  //@ts-ignore
  console.log(barcode);
  const drug = await ds.drug.get({ barcode });
  console.log(drug);

  if (!drug) {
    return okReturn(JSON.stringify(drug));
  }
  // @ts-ignore
  const name = drug.drug;
  const generic = await getGeneric(name);
  console.log(generic);

  return okReturn(JSON.stringify({ generic }));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
