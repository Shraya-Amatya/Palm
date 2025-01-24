
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import banner from '../../assets/banner.png';
function Navbar() {
  return (
    <>
    <nav className={styles.navbar}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <ul>
        <li><a href="#">Partners</a></li>
        <li><a href="#">Plotting</a></li>
        <li><a href="#">Contact</a></li>
        <li><button className={styles.btn}>Login</button></li>
      </ul>
    </nav>
    <div>
      <img src={banner} alt="banner" className={styles.banner} />
    </div>
    </>
  );
}

export default Navbar;
