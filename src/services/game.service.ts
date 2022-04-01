import axios from 'axios';
import { caseEnum } from '@monorepo/common';

export interface UpdateGameDto {
  x: number;
  y: number;
  case: caseEnum;
}

export const GameService = {
  get: async (clientId: string) => {
    return axios
      .get('http://localhost:3001/game', {
        headers: {
          clientId,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  play: async (clientId: string, data: UpdateGameDto) => {
    return axios
      .post('http://localhost:3001/game', data, {
        headers: {
          clientId,
        },
      })
      .then((response) => response.data);
  },
};
