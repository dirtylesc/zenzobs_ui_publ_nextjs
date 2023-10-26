import { 
  Metadata 
}                   from "next";
import classNames   from 'classnames';

import styles       from '@/app/content.module.scss'
import List         from "@/components/List";
import ListItem from "@/components/List/ListItem";

const cx        = classNames.bind(styles);

type Props = {
  params: {locale: string};
};

const metadata: Metadata = {
  title: "ZenZobs Manager - User",
};

const menu = {
  list: [
    {
      title : "",
      type  : "",
      cols  : [
        "ID", "Tài khoản", "Email", "SĐT"
      ]   
    }
  ]
}

function AutUserPage({params: {locale}}: Props) {
  return (
    <div className="flex">
      <div className={cx(styles.list, "lg:w-3/12 md:w-3/12 sm:w-12/12")}>
        <List>
          <ListItem 
            title = "Quản trị viên"
          />
          {/* <ListItem 
            title = "Quản trị viên"
          /> */}
        </List>
      </div>
      <div className={cx(styles.ent, "lg:w-9/12 md:w-9/12 sm:w-12/12")}></div>
    </div>
  );
}

export default AutUserPage;
export { metadata };
