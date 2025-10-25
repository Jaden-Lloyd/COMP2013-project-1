import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ data }) {
  const [productQuantity, setProductQuantity] = useState(
    data.map((prod) => {
      return {
        id: prod.id,
        quantity: 0,
        price: parseFloat(prod.price.replace("$", "")),
      };
    })
  );

  //new state for the cart that starts as an empty array
  const [cart, setCart] = useState([]);

  //this function will handle the add to quantity button on click event
  //when the user clicks the add button, the quantity will add one to the quantity
  //property in the state of the card that has the same id
  const handleAddQuantity = (productId, mode) => {
    if (mode === "product") {
      const newProductQuantity = productQuantity.map((prod) => {
        if (prod.id === productId) {
          return { ...prod, quantity: prod.quantity + 1 };
        }
        return prod;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
    if (mode === "cart") {
      const newCartQuantity = cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(newCartQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "product") {
      const newProductQuantity = productQuantity.map((prod) => {
        if (prod.id === productId && prod.quantity > 0) {
          return { ...prod, quantity: prod.quantity - 1 };
        }
        return prod;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
    if (mode === "cart") {
      const newCartQuantity = cart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(newCartQuantity);
      return;
    }
  };

  //This function will handle adding a product to a cart
  //Each addition will take the product, quantity, and total

  const handleAddToCart = (productToAdd) => {
    const currentProduct = data.find((prod) => prod.id === productToAdd.id);
    const productInCart = cart.find((item) => item.id === productToAdd.id);
    if (productToAdd.quantity === 0) {
      alert("Please add quantity before adding to cart");
      return;
    } else if (productInCart) {
      const newCartQuantity = cart.map((item) => {
        if (item.id === productToAdd.id) {
          return { ...item, quantity: item.quantity + productToAdd.quantity };
        }
        return item;
      });
      setCart(newCartQuantity);
      return;
    } else {
      setCart((prevCart) => {
        return [
          ...prevCart,
          {
            ...currentProduct,
            quantity: productToAdd.quantity,
            price: productToAdd.price,
          },
        ];
      });
    }
  };

  //This function will remove selected items from the cart
  const handleRemoveFromCart = (cartItem) => {
    const filteredCart = cart.filter((item) => item.id !== cartItem.id);
    setCart(filteredCart);
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }

  return (
    <div>
      <NavBar username={"Jaden"} totalPrice={totalPrice} />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          data={data}
          productQuantity={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />

        <CartContainer
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleEmptyCart={handleEmptyCart}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}
