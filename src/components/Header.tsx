import type { CartItem, Guitar } from "../types";

type HeaderProps = {
  cart: CartItem[];
  decreaseQuantity: (id: Guitar["id"]) => void;
  increaseQuantity: (id: Guitar["id"]) => void;
  removeFromCart: (id: Guitar["id"]) => void;
  clearCart: () => void;
  cartTotal: number;
  isEmpty: boolean;
};

function Header({
  cart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
  cartTotal,
  isEmpty,
}: HeaderProps) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img src="img/logo.svg" alt="imagen logo" className="img-fluid" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                src="/img/carrito.png"
                alt="imagen carrito"
                className="img-fluid"
              />
              <div className="bg-white p-3" id="carrito">
                {isEmpty ? (
                  <>
                    <p className="text-center">El carrito esta vacio</p>
                  </>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                                className="img-fluid"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">{guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                className="btn btn-dark"
                                type="button"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                              {guitar.quantity}
                              <button
                                className="btn btn-dark"
                                type="button"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total a pagar:{" "}
                      <span className="fw-bold">${cartTotal}</span>{" "}
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
