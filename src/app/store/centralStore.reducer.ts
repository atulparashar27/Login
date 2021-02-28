import { Action } from '@ngrx/store';
import { BloggingObj } from './Blogging.model';

export const ADD_BLOGS = 'ADD_BLOGS';
export const DELETE_BLOGS = 'DELETE_BLOGS';
export const EDIT_BLOGS = 'EDIT_BLOGS';

export function addBlogReducer(state: BloggingObj[] = [], action): any {
  switch (action.type) {
    case ADD_BLOGS:
        const add = [...state, action.payload];
        return add;
    case DELETE_BLOGS:
        return [...state.filter(s => s.id !== action.payload.id)];
    case EDIT_BLOGS:
        state = [...state.filter(s => s.id !== action.payload.id)];
        const update = [...state, action.payload];
        return update;
    default:
        return state;
    }
}
