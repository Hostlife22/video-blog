import { RootState } from '../../app';

export const selectSearchValue = (state: RootState) => state.search.value;
