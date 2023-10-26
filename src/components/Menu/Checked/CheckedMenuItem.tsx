import classNames from 'classnames';

import styles from './CheckedMenu.module.scss'

const cx = classNames.bind(styles);

function CheckedMenuItem() {
    return <ul className={cx(styles.wrapper)}></ul>
}

export default CheckedMenuItem;