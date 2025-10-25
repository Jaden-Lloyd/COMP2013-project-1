import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  id,
  image,
  productName,
  quantity,
  price,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div className="CartCard">
      <img src={image} alt="" height="100px" />
      <h2>{productName}</h2>
      <p>${price.toFixed(2)}</p>
      <div className="CartCardInfo"></div>

      <QuantityCounter
        productQuantity={quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="cart"
      />

      <div className="CartListBtns">
        <h3>Total Price: ${(quantity * price).toFixed(2)}</h3>
        <button
          className="RemoveButton"
          onClick={() => {
            handleRemoveFromCart({ id, productName, quantity, price });
          }}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
}
