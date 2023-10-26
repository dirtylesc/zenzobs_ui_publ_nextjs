'use client'

import { 
  MouseEventHandler, ReactElement, useEffect 
}                 from "react";
import { 
  useTranslations
}                 from "next-intl";
import Image      from "next/image";

import classNames from "classnames";
import Icon       from "@mdi/react";

import styles     from "./Button.module.scss";

const cx    = classNames.bind(styles);
const styleObj = {
  wrapper   : [
    styles.wrapper
  ],
  title     : [
    "min-w-max"
  ]
}
type  Props = {
  icon     ?: {
    src     ?: string;
    alt     ?: string;
    width   ?: number;
    height  ?: number;
    path    ?: string;
    size    ?: number;
  },
  IconComp  ?: ReactElement;
  title     ?: string;
  type      ?: string;
  onClick   ?: MouseEventHandler,

  //...props
  style     ?: {
    icon    ?: string;
    title   ?: string;
  },
};

function Button({ 
  icon,
  IconComp,
  title,
  type,
  onClick,
  ...props
}: Props) {
  const t             = useTranslations();
  let   wrapperStyle  = `flex items-center flex-${type}`

  if(icon?.path) {
    IconComp = <Icon path={icon.path} size={1}/>;
  } else if(icon?.src) {
    IconComp = <Image src={icon.src} alt={t(icon.alt)} width={icon.width} height={icon.height} />
  }

  return (
    <button className={cx(...styleObj.wrapper, type && wrapperStyle)} onClick={onClick}>
      {IconComp}
      {title && 
        <span className={cx(...styleObj.title, props.style?.title)}>{t(title)}</span>
      }
    </button>
  );
}

export default Button;
