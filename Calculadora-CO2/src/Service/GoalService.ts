/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './Api';
import type { IUserGoal, IUserGoalDTO } from '../Types/goal.types.ts';

export const getGoal = async (): Promise<IUserGoal | null> => {
  try {
    const response = await api.get<IUserGoal | null>('/Goals');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar meta:', error);
    throw new Error(error.message || 'Falha ao buscar meta da API.');
  }
};


export const setGoal = async (
  goalDto: IUserGoalDTO
): Promise<IUserGoal> => {
  try {
    const response = await api.post<IUserGoal>('/Goals', goalDto);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao salvar meta:', error);

    if (error.response) {
      throw new Error(error.response.data || 'Erro nos dados da requisição');
    } else if (error.request) {
      throw new Error('Não foi possível conectar à API. Verifique a rede.');
    } else {
      throw new Error(error.message);
    }
  }
};
