import { useContext } from 'react';
import { BlogsContext } from '../context/ContextProvider';

const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export { useBlogs };
