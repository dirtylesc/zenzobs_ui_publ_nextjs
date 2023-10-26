'use client'

import React      from "react";
import { 
  useTranslations 
}                 from "next-intl";
import classNames from "classnames";

import styles     from "./SidebarMenu.module.scss";

const cx = classNames.bind(styles);
type Props = {
  title     ?: string;
  style     ?: {
    wrapper ?: string;
    list    ?: string;
  };
  children  : React.ReactNode;
}

function MenuList({
  title,
  style,
  children,
}: Props) {
  const t = useTranslations();

  return (
    <div className={cx(styles.menu_list)}>
      {title && <h5 className={cx(styles.menu_list__title)}>{t(title)}</h5>}
      <ul className={cx(styles.menu_list__content, style?.list)}>{children}</ul>
    </div>
  );
}

export default MenuList;
