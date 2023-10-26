import classNames     from 'classnames';
import { 
  mdiBellOutline, 
  mdiCogOutline,
  mdiEmailOutline,
  mdiFacebook,
  mdiLockAlertOutline,
  mdiPencilBoxOutline
}                     from '@mdi/js';
import Icon           from '@mdi/react';

import styles         from './Header.module.scss'
import Button         from '@/components/Button';
import LangMenu from './LangMenu';

const cx        = classNames.bind(styles);
const menu = {
  
}
const styleObj  = {
  wrapper   : [
    styles.wrapper
  ],
  topBar   : {
    wrapper   : [styles.top_bar],
    container : [
      styles.top_bar_container,
      "container px-1 mx-auto w-11/12",
    ],
    content   : [
      "flex items-center py-1"
    ],
    leftContent: {
      wrapper: [ "w-4/12" ],
      content: [ "flex items-center" ]
    },
    rightContent: {
      wrapper: [ "w-8/12" ],
      content: [ "flex items-center float-right" ],
      createOffer: [ 
        styles.create_offer,
        "me-4 p-2 border border-gray-300 rounded",
        "only-user"
      ],
      login: [ 
        styles.create_offer,
        "pr-0 py-2 me-3 align-middle",
        "only-guest"
      ],
      lang: [
        
      ]
    }
  },
}

function Header() {
  return (
    <header className = {cx(...styleObj.wrapper)}>
      <div className={cx(...styleObj.topBar.wrapper)}>
        <div className={cx(...styleObj.topBar.container)}>
          <div className={cx(...styleObj.topBar.content)}>
            <div className={cx(...styleObj.topBar.leftContent.wrapper)}>
              <div className={cx(...styleObj.topBar.leftContent.content)}>
                <Button 
                  icon= {{
                    path: mdiFacebook,
                    size: 1
                  }}
                />
                <Button 
                  icon= {{
                    path: mdiEmailOutline,
                    size: 1
                  }}
                />
              </div>
            </div>
            <div className={cx(...styleObj.topBar.rightContent.wrapper)}>
              <div className={cx(...styleObj.topBar.rightContent.content)}>
                <div className={cx(...styleObj.topBar.rightContent.createOffer)}>
                  <Button 
                    icon    ={{
                      path  : mdiPencilBoxOutline,
                      size  : 1
                    }}
                    title   ="cms.Header.Menu.create_offer"
                    type    ='col'
                    style   ={{
                      title : "mt-1"
                    }}
                  />
                </div>
                <div className={cx(...styleObj.topBar.rightContent.login)} >
                  <Button 
                    icon    ={{ 
                      path  : mdiLockAlertOutline,
                    }}
                    title   ="cms.Common.btn_login"
                    type    ='row'
                    style   ={{
                      title : "ms-3"
                    }}
                  />
                </div>
                <div className={cx(...styleObj.topBar.rightContent.lang)}>
                  <LangMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MenuList style = {{ list: cx(...styleObj.rightMenu.) }}>
        {
          rightMenu.map(item => 
            <MenuListItem 
              key       = {item.key} 
              title     = {item.title} 
              leftIcon  = {item.leftIcon}
              style     = {{ 
                ...styleObj.item,
                wrapper : item.style.wrapper,
                icon    : item.style.icon 
              }}
            />
          )
        }
      </MenuList> */}
      <ul className={cx()}></ul>
      <div className={cx()}>
        
      </div>
    </header>
  );
}

export default Header;
