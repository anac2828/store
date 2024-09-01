import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../CartContext";

function ProductCard({ product }) {
  const { id } = product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(id);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <div>
                <Button
                  onClick={() => cart.addOneToCart(id)}
                  sm="6"
                  className="mx-2"
                >
                  +
                </Button>
                <Button
                  onClick={() => cart.removeOneFromCart(id)}
                  sm="6"
                  className="mx-2"
                >
                  -
                </Button>
              </div>
            </Form>
            <Button
              variant="danger"
              onClick={() => cart.deleteFromCart(id)}
              className="my-3"
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => cart.addOneToCart(id)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
