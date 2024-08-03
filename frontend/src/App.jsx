import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "pages/Login/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import { RequireAuth, RootErrorBoundary, Fallback } from "./routes";
import ProductsPage from "pages/v2/Products";
import CreateProductPage from "pages/v2/CreateProduct";
import ProductDetailPage from "pages/v2/ProductDetail";
import AccountsPage from "pages/v2/Accounts";

import MetalManagementPage from "pages/Metal/MetalManagement";
import MetalPriceDetailPage from "pages/Metal/MetalPriceDetail";
import MetalPriceMonitor from "pages/Metal/MetalPriceMonitor";
import OrdersPage from "pages/v2/Orders";
import MetalsPage from "pages/v2/Metals";
import WarrantyTypesPage from "pages/v2/WarrantyTypes";
import WarrantyProductsPage from "pages/v2/WarrantyProducts";
import DanhSach from "components/huyComponent/components/CapNhatMua";
import LapDon from "components/huyComponent/components/LapDon";
import HoaDon from "components/huyComponent/components/HoaDon";
import CapNhat from "components/huyComponent/components/CapNhat";
import LapDonMua from "components/huyComponent/components/LapDonMua";
import CapNhatMua from "components/huyComponent/components/CapNhatMua";
import HoaDonMua from "components/huyComponent/components/HoaDonMua";
import WarrantyRepairManagement from "pages/v2/WarrantyRepair/WarrantyRepair";
import { useAuthStore } from "stores";
import useEffectOnce from "hooks/useEffectOnce";
import axios from "axios";
import { useRef } from "react";
import AccountProfile from "pages/v2/Accounts/AccountProfile";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          {
            path: "",
            element: <AdminLayout />,
            children: [
              {
                path: "products",
                element: <ProductsPage />,
              },
              {
                path: "products/create-product",
                element: <CreateProductPage />,
              },
              {
                path: "product_detail/:id",
                element: <ProductDetailPage />,
              },
              {
                path: "accounts",
                element: <AccountsPage />,
              },
              {
                path: "/dashboard",
                element: <MetalManagementPage />,
              },
              {
                path: "/metal-prices-details",
                element: <MetalPriceDetailPage />,
              },
              {
                path: "/metal-price-monitor",
                element: <MetalPriceMonitor />,
              },
              {
                path: "/meterials",
                element: <MetalsPage />,
              },
              {
                path: "/order",
                element: <OrdersPage />,
              },
              {
                path: "/order/:id",
                element: <HoaDon />,
              },
              {
                path: "/order/update/:id",
                element: <CapNhat />,
              },
              {
                path: "/warranty-products",
                element: <WarrantyProductsPage />,
              },
              {
                path: "/warranty-types",
                element: <WarrantyTypesPage />,
              },
              {
                path: "/order-1",
                element: <DanhSach />,
              },
              // {
              //   path: "/order-2",
              //   element: <HoaDon />,
              // },
              // {
              //   path: "/order-3",
              //   element: <CapNhat />,
              // },
              // {
              //   path: "/order-4",
              //   element: <LapDonMua />,
              // },
              // {
              //   path: "/order-5",
              //   element: <CapNhatMua />,
              // },
              // {
              //   path: "/order-6",
              //   element: <HoaDonMua />,
              // },
              {
                path: "/create-order",
                element: <LapDon />,
              },
              {
                path: "/create-buy-order",
                element: <LapDonMua />,
              },
              {
                path: "/warranty-repair",
                element: <WarrantyRepairManagement />,
              },
               {
                path: "/profile",
                element: <AccountProfile />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function App() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setAT = useAuthStore((state) => state.setAT);
  const intervalRef = useRef();
  console.log("accessToken: " + accessToken);
  console.log("refreshToken: " + refreshToken);
  useEffectOnce(() => {
    if (refreshToken) {
      // try to renew tokens
      axios
        .post("http://localhost:8080/api/v1/auth/refresh-token", null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          if (!res) return;
          setAT(res.access_token);
          intervalRef.current = setInterval(() => {
            console.log("called in useEffect()");

            sendRefreshToken();
          }, 60000); // 10s
        })
        .catch((err) => {
          console.log(err);
          logoutUser();
        });
      // refreshTokens(refresh)
      //     .then((result) => {
      //         if (!result) return;
      //         const { auth, refresh, tokenExpiry } = result;
      //         authenticate({ auth, refresh }, tokenExpiry);
      //         intervalRef.current = setInterval(() => {
      //             console.log("called in useEffect()");
      //             sendRefreshToken();
      //         }, tokenExpiry);
      //     })
      //     .catch((err) => {
      //         if (err instanceof ActionLogout) {
      //             handleLogout();
      //         }
      //     });
    }
  });
  const sendRefreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    axios
      .post("http://localhost:8080/api/v1/auth/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      })
      .then((res) => {
        if (!res) return;
        console.log("accessToken: " + res.access_token);
        setAT(res.access_token);
      })
      .catch((err) => {
        logoutUser();
      });
  };
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}
