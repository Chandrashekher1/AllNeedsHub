import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from './Components/Header';
import Body from './Components/Body';
import Login from './Components/Login';
import Cart from './Components/Cart';
import ItemsMenu from './Components/ItemsMenu';
import Items from "./Components/Items";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Checkout from "./Components/Checkout";
import PaymentCheckOut from "./Components/PaymentCheckOut";

const AppLayout = () => (
  
  <div className="overflow-x-hidden font-sans">
    <Header />
    <Body/>
    <Outlet />
    {/* <Footer/> */}
  </div>
);


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={appStore}>
        <AppLayout/>
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <Items />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/items/:ItemsId",
        element: <ItemsMenu />,

      },
      {
        path: "/checkout/",
        element: <Checkout />,
      },
      {
        path:"/payment/",
        element:<PaymentCheckOut/>
      }
    ],
  },
]);


const App = () => (
  <RouterProvider router={appRouter} />
);

export default App;
