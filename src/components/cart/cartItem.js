import React from "react";
import * as styles from "./styles";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const trashCan = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

const CartItem = ({ data, addToCart, deleteFromCart, deleteAllItems, setCart }) => {
  return (
    <div className={styles.itemCont}>
      <div className={styles.imgTitle} title={data.name}>
        <img className={styles.itemImg} src={data.img?.data || data.img} />
        <div className={styles.itemTitleCont}>
          <span className={styles.itemTitle}>{data.name}</span>
          <span className={styles.price}>Unidad: ${data.price}</span>
        </div>
      </div>
      <div className={styles.priceQuant}>
        <div className={styles.qttySect}>
          <button
            className={styles.qttySub}
            onClick={() => {
              deleteFromCart(data.prod_id, setCart);
            }}
          >
            <MinusSmallIcon className="w-4 h-4 stroke-2 stroke-white sm:stroke-black group-hover/sub:lg:stroke-cyan-700" />
          </button>
          <span className={styles.quantity}>{data.quantity}</span>
          <button
            className={styles.qttyAdd}
            onClick={() => {
              addToCart(data.prod_id, setCart);
            }}
          >
            <PlusSmallIcon className="w-5 h-5 stroke-2 stroke-white sm:stroke-black group-hover/add:lg:stroke-cyan-700" />
          </button>
        </div>
        <div className={styles.priceSub}>
          <span className={styles.subTot}>Subtotal: ${(data.price * data.quantity).toFixed(2)}</span>
        </div>
        <button
          onClick={() => {
            deleteAllItems(data.prod_id, setCart);
          }}
          title="Eliminar del carrito."
          className={styles.dltButton}
        >
          {trashCan}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
