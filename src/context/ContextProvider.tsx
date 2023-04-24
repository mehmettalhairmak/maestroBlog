import React, { createContext, useReducer } from 'react';
import { BlogsModel, ResultModel } from '../models/BlogsModel';

// Types
type ActionType =
  | { type: 'SET_BLOGS'; payload: BlogsModel }
  | { type: 'ADD_BLOGS'; payload: ResultModel[] }
  | { type: 'SET_SELECTED_BLOG'; payload: ResultModel | null };

interface StateType extends BlogsModel {
  result: ResultModel[];
  selectedBlog: ResultModel | null;
}

type ContextType = {
  blogs: StateType;
  blogsDispatch: React.Dispatch<ActionType>;
  selectedBlog: ResultModel | null;
};

// Initial State
const initialState: StateType = {
  totalCount: 0,
  result: [],
  message: null,
  success: false,
  exception: null,
  selectedBlog: null,
};

// Reducer
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, ...action.payload };
    case 'ADD_BLOGS':
      return {
        ...state,
        result: [...state.result, ...action.payload],
      };
    case 'SET_SELECTED_BLOG':
      return { ...state, selectedBlog: action.payload };
    default:
      return state;
  }
};

// Context
const BlogsContext = createContext<ContextType>({
  blogs: initialState,
  blogsDispatch: () => {},
  selectedBlog: null,
});

// Provider
const BlogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BlogsContext.Provider
      value={{
        blogs: state,
        selectedBlog: state.selectedBlog,
        blogsDispatch: dispatch,
      }}>
      {children}
    </BlogsContext.Provider>
  );
};

export { BlogsContext, BlogsProvider };
