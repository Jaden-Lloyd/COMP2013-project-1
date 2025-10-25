import CartCard from "./CartCard";

export default function CartContainer({
  cart,
  image,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
  handleEmptyCart,
  totalPrice,
}) {
  return (
    <div className="CartContainer">
      <h3>Cart Items: {cart.length}</h3>
      <p>{cart.length === 0 && "Cart is empty!"}</p>
      {cart.map((item) => (
        <CartCard
          key={item.id}
          {...item}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
        />
      ))}
      <div className="CartListBtns">
        <button className="RemoveButton" onClick={handleEmptyCart}>
          Empty Cart
        </button>
        <button id="BuyButton">Buy (${totalPrice.toFixed(2)})</button>
      </div>
    </div>
  );
}
