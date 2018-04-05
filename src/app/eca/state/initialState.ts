import {IConfig} from '../services/configuration.service';
import {v4 as uuid} from 'uuid';

const getQueryParam = (name: string): string => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export interface IScans {
  entities: object;
  synced: number[];
  unsynced: number[];
}

export interface IScan {
  id: number;
  blob: Blob;
}

export interface ISession {
  id: string;
}

export interface IStateShape {
  config: IConfig | {};
  token: string;
  session: ISession;
  scans: IScans;
}

export const initialState = (): IStateShape => {
  return {
    config: {},
    token: getQueryParam('t'),
    session: {
      id: uuid(),
    },
    scans: {
      entities: {},
      synced: [],
      unsynced: [],
    },
  };
};
