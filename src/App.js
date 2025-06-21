import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Header from './Components/Header';
import Body from './Components/Body';
import Login from './Components/Login';
import Cart from './Components/Cart';
import ItemsMenu from './Components/ItemsMenu';
import Items from "./Components/Items";
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";
import Checkout from "./Components/Checkout";
import PaymentCheckOut from "./Components/PaymentCheckOut";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/userSlice";
import Profile from "./Components/Profile";
import SearchItems from "./Components/SearchItems";


const AppLayout = () => (
  <div className="overflow-x-hidden font-sans">
    <Header />
    <Body />
    <Outlet />
    {/* <Footer /> */}
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
         path: "/search/",
        element: <SearchItems />,
      },
      {
        path: "/checkout/",
        element: <Checkout />,
      },
      {
        path: "/payment/",
        element: <PaymentCheckOut />,
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, phoneNumber, email } = user;
        dispatch(addUser({ uid:uid, email:email, displayName:displayName, phoneNumber:phoneNumber }));
        
      } else {
        dispatch(removeUser());
       
      }
    });
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

// Wrap the App component with Provider here
const Root = () => (
  <Provider store={appStore}>
    <App />
  </Provider>
);

export default Root;