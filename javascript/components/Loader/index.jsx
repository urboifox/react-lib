/**
 * Loader Component
 *
 * This component renders a circular loading spinner with optional light or dark themes.
 *
 * Props:
 * - `light`: boolean (optional) - If true, the loader will use a lighter color theme, suitable for dark backgrounds.
 *
 * Usage:
 * - The loader can be used in any part of the application where an asynchronous operation or data fetch is in progress, providing a visual cue to the users that processing is ongoing.
 *
 * Styling:
 * - The component uses CSS modules for styling. The `light` prop toggles between different styles defined in `Loader.module.css`.
 */

import styles from './Loader.module.css';

export default function Loader({ light }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.loader} ${light ? styles.light : ""}`}>
        <div className={styles.loader_spinner}>
          <div className={styles.loader_component}>
            <div className={styles.half_circle}></div>
          </div>

          <div className={styles.loader_component}>
            <div className={styles.half_circle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
