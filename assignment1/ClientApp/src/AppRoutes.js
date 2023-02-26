import { AuthorDetails } from "./components/author/AuthorDetails";
import { CreateAuthor } from "./components/author/CreateAuthor";
import { UpdateAuthor } from "./components/author/UpdateAuthor";
import { ViewAuthors } from "./components/author/ViewAuthors";
import { CreateGenre } from "./components/genre/CreateGenre";
import { ViewGenre } from "./components/genre/ViewGenre";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/:admin",
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
    path: "/author/update/:id",
    element: <UpdateAuthor />,
  },
  {
    path: "/genre",
    element: <ViewGenre />,
  },
  {
    path: "/genre/create",
    element: <CreateGenre />,
  },
];

export default AppRoutes;
