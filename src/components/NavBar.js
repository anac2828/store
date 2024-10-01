import { useState, useContext } from 'react';
import { Button, Navbar, Modal } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.items }),
    });

    const { url: stripeURL } = await res.json();
    window.location.assign(stripeURL); //Stripe checkout URL
  };
  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => setShow(true)}>
            Cart {productsCount} Items
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((item) => (
                <CartProduct
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                />
              ))}

              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>
              <Button variant='success' onClick={handleCheckout}>
                Purchase Items
              </Button>
            </>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
