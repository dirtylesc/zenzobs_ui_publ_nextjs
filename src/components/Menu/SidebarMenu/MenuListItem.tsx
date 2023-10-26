'use client'

import React, { 
  Fragment,
  MouseEventHandler, 
  useEffect, 
  useState 
}                     from "react";
import { 
  useLocale, 
  useTranslations 
}                     from "next-intl";
import Link           from "next/link";
import Image          from "next/image";

import classNames     from "classnames";
import Icon           from "@mdi/react";

import styles         from "./SidebarMenu.module.scss";

const cx    = classNames.bind(styles);
type Props  = {
  title       ?: string;
  type        ?: string;
  path        ?: string;
  leftIcon    ?: {
    src       ?: string;
    alt       ?: string;
    path      ?: string,
  };
  rightIcon   ?: React.ReactNode;
  onClick     ?: MouseEventHandler;

  //...props
  href        ?: string;
  style       ?: {
    wrapper   ?: string;
    show      ?: string;
    title     ?: string;
    icon      ?: string;
  };
}
const getStyleObj = (type ?: string) => ({
  wrapper: [
    styles.menu_list_item,
    type === 'child' && styles.menu_list_item_child, 
    'list-none'
  ],
  title: [
    styles.menu_list_item__title
  ],
  leftIcon: [
    styles.menu_list_item__icon
  ],
  rightIcon: [
    styles.menu_list_item__right_icon
  ]
})

function MenuListItem({
  title,
  type = 'child',
  path,
  leftIcon,
  rightIcon,
  onClick = () => {},
  ...props
}: Props) {
  const [styleObj   , setStyleObj   ] = useState(getStyleObj());
  const [isShowChild, setIsShowChild] = useState(false)

  const locale    = useLocale()
  const t         = useTranslations();
  let   LeftComp  = null;
  let   MainComp  : React.ElementType = Fragment;

  if(leftIcon?.path) {
    LeftComp = <Icon path={leftIcon.path} />;
  } else if(leftIcon?.src) {
    LeftComp = <Image src={leftIcon.src} alt={t(leftIcon.alt)} width={32} height={32} />
  }

  if(path) {
    MainComp    = Link;
    props.href  = `/${locale}/${path}`
  }

  useEffect(() => {
    setStyleObj(getStyleObj(type))
  }, [type])

  const handleOnClickDefault = () => {
    if(isShowChild) {
      setIsShowChild(false);
      return;
    }
    setIsShowChild(true)
  }

  return (
    <li 
      className={cx(
        ...styleObj.wrapper,
        
        props.style?.wrapper,
        isShowChild && props.style?.show
      )} 
      onClick={type === 'parent' && handleOnClickDefault || onClick}
    >
      {
        React.createElement(MainComp, MainComp === Link && { href: props.href }, [
          leftIcon && (
            <div key="leftIcon" className={cx(...styleObj.leftIcon, props.style?.icon)}>
              {LeftComp}
            </div>
          ),
          title && (
            <span key="title" className={cx(...styleObj.title, props.style?.title)}>
              {t(title)}
            </span>
          ),
          rightIcon && (
            <div key="rightIcon" className={cx(...styleObj.rightIcon, props.style?.icon)}>
              {rightIcon}
            </div>
          ),
        ])
      }
    </li>
  );
}

export default MenuListItem;
