import styles from './Spinner.module.css';

function Spinner() {
	return (
		<div className={styles.spinner} role='status'></div>
	)
}

export default Spinner