import QuantityCounter from "./QuantityCounter";

//Presentation component for the quantity counter

export default function ProductCard({
  productQuantity,
  image,
  productName,
  brand,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  //Building our output
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" height="100px" />
      <p>{brand}</p>
      <p>${productQuantity.price.toFixed(2)}</p>

      <QuantityCounter
        productQuantity={productQuantity.quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={productQuantity.id}
        mode="product"
      />

      <button onClick={() => handleAddToCart(productQuantity)}>
        Add to Cart
      </button>
    </div>
  );
}
