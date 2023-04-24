import { BlogsModel } from '../models/BlogsModel';

const fetchBlogs = async (page: number): Promise<BlogsModel> => {
  return await fetch(
    `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${page}&count=10`,
  )
    .then(response => response.json())
    .then((data: BlogsModel) => {
      return data;
    });
};

export { fetchBlogs };
