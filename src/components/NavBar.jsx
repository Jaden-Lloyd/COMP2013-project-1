import cartEmpty from "../assets/cart-empty.png";
import cartFull from "../assets/cart-full.png";

//Presentation component for the nav bar

export default function NavBar({ username, totalPrice }) {
  return (
    <div className="NavBar">
      <div className="NavUser">
        <h3>Hello {username}</h3>
      </div>
      <div className="NavTitle">
        <h3>Groceries App</h3>
      </div>
      <div className="NavCart">
        <img src={totalPrice > 0 ? cartFull : cartEmpty} alt="" />
      </div>
    </div>
  );
}
