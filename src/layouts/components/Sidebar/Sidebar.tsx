import classNames               from "classnames";
import Icon                     from '@mdi/react';
import { 
  mdiAccountOutline, 
  mdiArchiveArrowDownOutline, 
  mdiArchiveArrowUpOutline, 
  mdiArchiveCheckOutline, 
  mdiPostOutline, 
  mdiRobotAngryOutline 
}                               from '@mdi/js';

import constConfig              from "@/constants";
import styles                   from "./Sidebar.module.scss";
import MenuList                 from "@/components/Menu/SidebarMenu/MenuList";
import MenuListItem             from "@/components/Menu/SidebarMenu/MenuListItem";

const cx        = classNames.bind(styles);
const styleObj  = {
  menu          : {
    wrapper     : styles.menu_list_item,
    show        : styles.menu_list_item__show,
    title       : styles.menu_list_item__title
  }
}

const menu = [
  {
    title     : constConfig.groups.AUT,
    type      : 'parent',
    leftIcon  : {
      path    : mdiAccountOutline
    },
    rightIcon : mdiRobotAngryOutline,
    children  : [
      {
        title : constConfig.groups.AUT_USER,
        path  : constConfig.paths.AUT_USER
      },
      {
        title : constConfig.groups.AUT_AUTH_SERVICE,
        path  : constConfig.paths.AUT_AUTH_SERVICE
      },
      {
        title : constConfig.groups.AUT_ROLE,
        path  : constConfig.paths.AUT_ROLE
      },
      {
        title : constConfig.groups.AUT_RIGHT,
        path  : constConfig.paths.AUT_RIGHT
      },
    ]
  },
  {
    title     : constConfig.groups.NSO,
    type      : 'parent',
    leftIcon  : {
      path    : mdiPostOutline
    },
    rightIcon : mdiRobotAngryOutline,
    children  : [
      {
        title : constConfig.groups.NSO_OFFER,
        path  : constConfig.paths.NSO_OFFER
      },
      {
        title : constConfig.groups.NSO_POST,
        path  : constConfig.paths.NSO_POST
      },
    ]
  },
  {
    title     : 'mat_material',
    type      : 'parent',
    leftIcon  : {
      path    : mdiArchiveCheckOutline
    },
    rightIcon : mdiRobotAngryOutline,
    children  : [
      {
        title : constConfig.groups.TPY_CATEGORY,
        path  : constConfig.paths.TPY_CATEGORY
      },
    ]
  },
  {
    title     : 'sor_order_in',
    type      : 'parent',
    leftIcon  : {
      path    : mdiArchiveArrowDownOutline
    },
    rightIcon : mdiRobotAngryOutline
  },
  {
    title     : 'sor_order_out',
    type      : 'parent',
    leftIcon  : {
      path    : mdiArchiveArrowUpOutline
    },
    rightIcon : mdiRobotAngryOutline
  }
]

function Sidebar() {
  const translPrefix = "cms.Sidebar.";

  return (
    <section className = {cx(styles.wrapper)}>
      <MenuList title   = {`${translPrefix}app`}>
        {
          menu.map(item => (
            <div key    = {item.title}>
              <MenuListItem 
              title     = {`${translPrefix}${item.title}`}
              type      = {item.type}
              leftIcon  = {item.leftIcon}
              rightIcon = {<Icon path={item.rightIcon} size={.9}/>}
              style     = {item.type === 'parent' ? styleObj.menu : undefined}
              />
              
              {item.children && (
                <ul className = {styles.menu_list_item__children}>
                  {
                    item.children.map(child => (
                      <MenuListItem
                        key   = {child.title}
                        title = {`${translPrefix}${child.title}`}
                        path  = {child.path}
                      />
                    ))
                  }
                </ul>
              )}
            </div>
          ))
        }
      </MenuList>
    </section>
  );
}

export default Sidebar;
