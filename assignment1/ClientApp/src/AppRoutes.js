import { AuthorDetails } from "./components/author/AuthorDetails";
import { CreateAuthor } from "./components/author/CreateAuthor";
import { UpdateAuthor } from "./components/author/UpdateAuthor";
import { ViewAuthors } from "./components/author/ViewAuthors";
import { BookDetails } from "./components/book/BookDetails";
import { CreateBook } from "./components/book/CreateBook";
import { UpdateBook } from "./components/book/UpdateBook";
import { ViewCart } from "./components/cart/ViewCart";
import { CreateGenre } from "./components/genre/CreateGenre";
import { GenreDetails } from "./components/genre/GenreDetails";
import { UpdateGenre } from "./components/genre/UpdateGenre";
import { ViewGenre } from "./components/genre/ViewGenre";
import { Home } from "./components/Home";
import { Checkout } from "./components/orders/Checkout";
import { FindOrders } from "./components/orders/FindOrders";
import { ViewOrders } from "./components/orders/ViewOrders";
import { CreatePublisher } from "./components/publisher/CreatePublisher";
import { PublisherDetails } from "./components/publisher/PublisherDetails";
import { UpdatePublisher } from "./components/publisher/UpdatePublisher";
import { ViewPublisher } from "./components/publisher/ViewPublisher";
import Login from "./components/user/Login";
import { Logout } from "./components/user/Logout";
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
    path: "/logout",
    element: <Logout />,
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
    path: "/genre/:id",
    element: <GenreDetails />,
  },
  {
    path: "/genre/create",
    element: <CreateGenre />,
  },
  {
    path: "/genre/update/:id",
    element: <UpdateGenre />,
  },
  {
    path: "/publisher",
    element: <ViewPublisher />,
  },
  {
    path: "/publisher/:id",
    element: <PublisherDetails />,
  },
  {
    path: "/publisher/create",
    element: <CreatePublisher />,
  },
  {
    path: "/publisher/update/:id",
    element: <UpdatePublisher />,
  },
  {
    path: "/book/:id",
    element: <BookDetails />,
  },
  {
    path: "/book/create",
    element: <CreateBook />,
  },
  {
    path: "/book/update/:id",
    element: <UpdateBook />,
  },
  {
    path: "/cart",
    element: <ViewCart />,
  },
  {
    path: "/my-orders",
    element: <FindOrders />,
  },
  {
    path: "/orders",
    element: <ViewOrders />,
  },
  {
    path: "order/checkout",
    element: <Checkout />,
  },
];

export default AppRoutes;
