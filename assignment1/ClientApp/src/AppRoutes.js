import { Counter } from "./components/Counter";
import { DisplayImages } from "./components/DisplayImages";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { UploadImage } from "./components/UploadImage";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/upload-image",
    element: <UploadImage />,
  },
  {
    path: "/display-image",
    element: <DisplayImages />,
  },
];

export default AppRoutes;
