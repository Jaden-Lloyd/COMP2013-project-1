import { useState, useEffect } from "react";
import axios from "axios";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

//Primary logic component

export default function GroceriesAppContainer({ data = [] }) {
  const [productQuantity, setProductQuantity] = useState(
    data.map((prod) => {
      return {
        id: prod.id,
        quantity: 0,
        price: parseFloat(prod.price.replace("$", "")),
      };
    })
  );

  //state for the cart that starts as an empty array
  const [cart, setCart] = useState([]);
  //state for product data
  const [productsData, setProductsData] = useState([]);
  //state for form data
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  //state for post responce
  const [postResponse, setPostResponse] = useState("");
  //state to flag if editing
  const [isEditing, setIsEditing] = useState(false);

  //useEffect
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  //This function adds quantity to cart or product cards
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

  //This function removes quantity from cart or product cards
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

  //This fuction handles adding products to the cart
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

  //This function will empty the whole cart
  const handleEmptyCart = () => {
    setCart([]);
  };

  //Get data from DB handler
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductsData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle to reset the form
  const handleResetForm = () => {
    setFormData({
      id: "",
      productName: "",
      brand: "",
      image: "",
      price: "",
    });
  };

  //Handle the submission of data
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        await axios
          .post("http://localhost:3000/products", formData)
          .then((response) => setPostResponse(response.data.message))
          .then(() => handleResetForm());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the onChange event
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Handle to delete one product by id (MongoDB _id)
  const handleOnDelete = async (_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${_id}`
      );
      setPostResponse(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the edits of one product by id (MongoDB _id)
  const handleOnEdit = async (_id) => {
    try {
      const productToEdit = await axios.get(
        `http://localhost:3000/products/${_id}`
      );

      setFormData({
        id: productToEdit.data.id, // product's real ID
        productName: productToEdit.data.productName,
        brand: productToEdit.data.brand,
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        _id: productToEdit.data._id, // MongoDB _id
      });

      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle updating API patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //Gets price of all items in the cart
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }

  return (
    <div>
      <NavBar username={"Jaden"} totalPrice={totalPrice} />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          data={productsData}
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
