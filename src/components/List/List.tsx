import classNames from "classnames";

import styles from "./List.module.scss";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlusBoxMultipleOutline } from "@mdi/js";

const cx    = classNames.bind(styles);
type  Props = {
  children  : React.ReactNode
}

function List({
  children
} : Props) {
  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.window_func, "float-right")}>
        <button
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect"
          id="vertical-list-btn"
        >
          <Icon path={mdiPlusBoxMultipleOutline} size={1} />
        </button>
        <button
          data-divtoogle="#div_List_All"
          className="btn-minimize-list"
          data-toggle="tooltip"
          data-placement="top"
          title=""
          data-original-title="Resize"
        >
          <Icon path={mdiMinus} size={1} />
        </button>
      </div>
      <div className={cx(styles.content)}>{children}</div>
    </div>
  );
}

export default List;
