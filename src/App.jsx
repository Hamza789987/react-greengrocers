import "./styles/reset.css";
import "./styles/index.css";
import { useState } from "react";
import initialStoreItems from "./store-items";

/*
 Here's what a store item should look like
 {
 id: '001-beetroot',
 name: 'beetroot',
 price: 0.35
 }

 What should a cart item look like? 🤔
 */

// console.log(initialStoreItems, storeItems);

export default function App() {
  // Setup state here...
  const [storeItems, setStoreItems] = useState(initialStoreItems);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);

  function handleAddToCart(storeItem) {
    const foundItemIndex = cartItem.findIndex(
      (item) => item.id === storeItem.id
    );
    if (foundItemIndex === -1) {
      setCartItem([...cartItem, { ...storeItem, quantity: 1 }]);
      setTotal(storeItem.price + total);
      console.log(cartItem[foundItemIndex]);
    } else {
      const updatedCart = [...cartItem];
      updatedCart[foundItemIndex].quantity += 1;
      setCartItem(updatedCart);
      setTotal(updatedCart[foundItemIndex].price + total);
    }
  }

  const increment = (item) => {
    const foundItemIndex = cartItem.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedCart = [...cartItem];

    if (foundItemIndex === -1) {
      updatedCart.push({ ...item, quantity: 1 });
    } else {
      updatedCart[foundItemIndex].quantity += 1;
    }

    setCartItem(updatedCart);
    setTotal(total + item.price);
  };

  const decrement = (item) => {
    const foundItemIndex = cartItem.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedCart = [...cartItem];

    if (item.quantity === 0) {
      // index of the item that = 0
      const indexOfDeleted = state.cart.indexOf(item);

      // that one will be deleted using splice
      state.cart.splice(indexOfDeleted, 1);
    }

    if (foundItemIndex !== -1) {
      if (updatedCart[foundItemIndex].quantity > 1) {
        updatedCart[foundItemIndex].quantity -= 1;
        setTotal(total - item.price);
      } else {
        updatedCart.splice(foundItemIndex, 1);
        setTotal(total - item.price);
      }
      setCartItem(updatedCart);
    }
  };

  console.log("out", cartItem);
  return (
    <>
      <header id='store'>
        <h1>Greengrocers</h1>
        <ul className='item-list store--item-list'>
          {/* Write some code here... */}
          {storeItems.map((item) => {
            return (
              <li key={item.id}>
                <div className='store--item-icon'>
                  <img src={`/assets/icons/${item.id}.svg`} alt='beetroot' />
                </div>
                <button onClick={() => handleAddToCart(item)}>
                  Add to cart
                </button>
              </li>
            );
          })}
        </ul>
      </header>
      <main id='cart'>
        <h2>Your Cart</h2>
        <div className='cart--item-list-container'>
          <ul className='item-list cart--item-list'>
            {/* Write some code here... */}
            {cartItem.map((item) => {
              return (
                <li key={item.id}>
                  <img
                    className='cart--item-icon'
                    src={`assets/icons/${item.id}.svg`}
                    alt={`${item.name}`}
                  />
                  <p>{item.name}</p>
                  <button
                    onClick={() => decrement(item)}
                    className='quantity-btn remove-btn center'>
                    -
                  </button>
                  <span className='quantity-text center'>{item.quantity}</span>
                  <button
                    onClick={() => increment(item)}
                    className='quantity-btn add-btn center'>
                    +
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='total-section'>
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className='total-number'> £{total.toFixed(2)} </span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href='https://www.flaticon.com/authors/icongeek26'
          title='Icongeek26'>
          Icongeek26
        </a>
        from
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </>
  );
}
