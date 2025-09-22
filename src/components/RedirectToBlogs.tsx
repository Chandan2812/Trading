import { useParams, Navigate } from "react-router-dom";

const RedirectToBlogs = () => {
  const { slug } = useParams();
  return <Navigate to={`/blogs/${slug}`} replace />;
};

export default RedirectToBlogs;
