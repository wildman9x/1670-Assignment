import { AuthorDetails } from "./components/author/AuthorDetails";
import { CreateAuthor } from "./components/author/CreateAuthor";
import { ViewAuthors } from "./components/author/ViewAuthors";
import { Counter } from "./components/Counter";
import { DisplayImages } from "./components/DisplayImages";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { UploadImage } from "./components/UploadImage";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/user/register",
    element: <Register />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/login",
    element: <Register />,
  },
  {
    path: "/author",
    element: <ViewAuthors />,
  },
  {
    path: "/author/:id",
    element: <AuthorDetails />,
  },
  {
    path: "/author/create",
    element: <CreateAuthor />,
  },
  {
    path: "/upload-image",
    element: <UploadImage />,
  },
];

export default AppRoutes;
