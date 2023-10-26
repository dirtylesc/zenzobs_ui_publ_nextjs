import React        from "react";
import classNames   from "classnames";

import styles       from "./Content.module.scss";

const cx = classNames.bind(styles);

function Content({ children }: { children: React.ReactNode }) {
  return <div className={cx(styles.wrapper)}>{children}</div>;
}

export default Content;
