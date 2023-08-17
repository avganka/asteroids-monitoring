import styles from './Cart.module.css';

function Cart() {
	return (
    <div className={styles.cart}>
      <div>
        <h2>Корзина</h2>
        <span>2 астероида</span>
      </div>
      <button>Отправить</button>
    </div>
  );
}

export default Cart