/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './Api';
import type { ITravelRequest, ITravelResult, ITripHistory } from '../Types/travel.types.ts';

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

export const getTravelHistory = async (): Promise<ITripHistory[]> => {
  try {
    // A API retorna um array de ITripHistory
    const response = await api.get<ITripHistory[]>('/Travels/history');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar histórico de viagens:', error);

    if (error.response) {
      throw new Error(error.response.data || 'Erro nos dados da requisição');
    } else if (error.request) {
      throw new Error('Não foi possível conectar à API. Verifique a rede.');
    } else {
      throw new Error(error.message);
    }
  }
};

export const deleteTravelById = async (id: string): Promise<boolean> => {
    try{
        const response = await api.delete<boolean>(`/Travels/${id}`);
        return response.data
    }
    catch (error: any){
         console.error('Erro ao buscar histórico de viagens:', error);

        if (error.response) {
        throw new Error(error.response.data || 'Erro nos dados da requisição');
        } else if (error.request) {
        throw new Error('Não foi possível conectar à API. Verifique a rede.');
        } else {
        throw new Error(error.message);
        }
    }
}