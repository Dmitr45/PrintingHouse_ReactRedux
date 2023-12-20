import logo from './logo.svg';
import styles from './ReactHeader.module.scss';

export default function ReactHeader (){

    return(
<div className={styles.AppHeader}>
    <img src={logo} className={styles.AppLogo} alt="logo" />
</div>
)}; 