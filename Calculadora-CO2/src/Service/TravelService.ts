/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './Api';
import type { ITravelRequest, ITravelResult } from '../Types/travel.types.ts';

export const calculateEmissions = async (
  requestData: ITravelRequest
): Promise<ITravelResult> => {

  try {
    const response = await api.post<ITravelResult>('/Travels', requestData);
    
    return response.data;

  } catch (error: any) {
    console.error('Erro ao chamar a API de cálculo:', error);

    if (error.response) {
      throw new Error(error.response.data || 'Erro nos dados da requisição');
    } else if (error.request) {
      throw new Error('Não foi possível conectar à API. Verifique a rede.');
    } else {
      throw new Error(error.message);
    }
  }
};