import {UpdateToken, TokenUpdated} from './config.actions';
import {tokenReducer} from './token.reducer';
import * as uuid from 'uuid';

describe('tokenReducer', () => {
  describe('ConfigurationActions.TOKEN_UPDATED', () => {
    it('should return the state with the updated token', () => {
      const action = new TokenUpdated('abc');

      const newState = tokenReducer('123', action);

      expect(newState).toEqual('abc');
    });
  });
});
