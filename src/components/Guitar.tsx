import { Dispatch } from "react"
import type { Guitar } from "../types"
import { CartActions } from "../reducers/cart-reducers"

type GuitarProps = {
  guitar: Guitar
  dispatch: Dispatch<CartActions>
}

function Guitar({ guitar, dispatch }: GuitarProps) {
  const { name, image, description, price } = guitar

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
          className="img-fluid"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          className="btn btn-dark w-100"
          type="button"
          onClick={() =>
            dispatch({ type: "add-to-cart", payload: { item: guitar } })
          }
        >
          Agregar carrrito
        </button>
      </div>
    </div>
  )
}

export default Guitar
