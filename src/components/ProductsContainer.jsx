import ProductCard from "./ProductCard";

//Presentation component for the products container

export default function ProductsContainer({
  data,
  productQuantity,
  handleOnChangePrice,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductsContainer">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          productQuantity={productQuantity.find(
            (prod) => prod.id == product.id
          )}
          handleOnChangePrice={handleOnChangePrice}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
