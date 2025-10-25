import "./App.css";
import GroceriesAppContainer from "./components/GroceriesAppContainer";
import products from "./data/products";

function App() {
  return (
    <>
      <GroceriesAppContainer data={products} />
    </>
  );
}

export default App;
