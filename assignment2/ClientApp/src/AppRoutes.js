import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DisplayImages } from "./components/DisplayImages";
import { UploadImage } from "./components/UploadImage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: "/upload-image",
    element: <UploadImage />,
  },
  {
    path: "/display-image",
    element: <DisplayImages />,
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
