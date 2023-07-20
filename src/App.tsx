// import "./App.css";
// import {Login} from "./dashbord/login/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsCard } from "./dashbord/homepage/ProductsCard";
import { Products } from "./dashbord/homepage/Products";
import { ProductDetails } from "./dashbord/homepage/ProductDetails";
import { Navbar } from "./dashbord/homepage/Navbar";
import { Header } from "./dashbord/homepage/Header";

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App;

const App = () => {
  return (
    <div className="App">
        <Header />
      {/* <BrowserRouter> */}
        <Routes>
          <Route  path="/" element={<Products/>} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/productscard" element={<ProductsCard />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;