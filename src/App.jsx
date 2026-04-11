import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import P404 from './pages/404';
import Proggress from './pages/proggres';
import InvoiceBuy from "./pages/buy-invoice.jsx";
import SellInvoice from "./pages/sell-invoice.jsx";
import { Context, ContextProvider } from "./context/Context.js";
import CAT_PAGE from "./pages/cat_page.jsx";
import ProductPage from "./pages/product_page.jsx";
import UnitsPage from "./pages/units_page.jsx";
import { useContext, useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import RefreshBTN from "./components/toolbar/refreshBTN.jsx";
import Eccounts_page from "./pages/eccounts_page.jsx";
import DOCS_PAGE from "./pages/docs_page.jsx";
import Billing_Page from "./pages/billing_page.jsx";
import Invoices_page from "./pages/invoices._page.jsx";
import LOGINPAGE from "./pages/auth/login.jsx";
//test
function App() {
  let { update, user } = useContext(Context)


  return (
    <div className="bg-gray-100 dark:bg-zinc-900 dark
    w-full h-dvh
    flex flex-col md:flex-row justify-center align-middle items-center">

      <BrowserRouter>
        {
          user &&
          <Sidebar />
        }


        {
          //btns
        }
        {
          user &&
          <RefreshBTN />
        }

        <div className="order-1 md:order-2
        w-10/11 md:w-4/6 h-9/10 mx-5 overflow-y-scroll md:overflow-hidden">

          <Routes>
            {
              user &&
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/proggres"  >
                  <Route index element={<Proggress />} />
                  <Route path="buyInvoice" element={<InvoiceBuy />} />
                  <Route path="products" element={<ProductPage />} />
                  <Route path="sellInvoice" element={<SellInvoice />} />
                  <Route path="cats" element={<CAT_PAGE />} />
                  <Route path="units" element={<UnitsPage />} />
                  <Route path="eccounts" element={<Eccounts_page />} />
                  <Route path="docs" element={<DOCS_PAGE />} />
                </Route>
                <Route path="/billing" element={<Billing_Page />} />
                <Route path="/invoices" element={<Invoices_page />} />
                <Route path="*" element={<P404 />} />
              </>
            }
            {
              !user &&
              <Route path="*" element={<LOGINPAGE />} />
            }



          </Routes>

        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
