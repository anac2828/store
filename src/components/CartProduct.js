import { useContext } from "react";
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";
import { Button } from "react-bootstrap";

function CartProduct({ id, quantity }) {
  const cart = useContext(CartContext);
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr />
    </>
  );
}

export default CartProduct;
