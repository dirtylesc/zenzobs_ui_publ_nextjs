'use client'

import classNames from "classnames";

import styles from "./List.module.scss";
import Button from "@/components/Button";
import { mdiAutorenew, mdiMinus } from "@mdi/js";
import DataTable from "./DataTable";
import { Provider }       from 'react-redux';
import store from '@/utils/store';

const cx    = classNames.bind(styles);
type Props  = {
  title     : string
};
const table = [
  {
    header: [
      {
        id: "id",
        title: "ID"
      },
      {
        id: "login01",
        title: "Tài khoản"
      },
      {
        id: "inf01",
        title: "Email"
      },
      {
        id: "inf02",
        title: "SĐT"
      },
    ],
    typ01: 1
  }
]

function ListItem({ title }: Props) {
  return (
    <Provider store={store}>
      <div className={cx(styles.item_wrapper)}>
        <div className={cx(styles.function)}>
          <div className="lg:w-8/12 md:w-8/12 px-1.5">
            <span className={cx(styles.title, "mb-4")}>{title}</span>
          </div>
          <div className="lg:w-4/12 md:w-4/12 text-right">
            {/* <Button icon={{ path: mdiAutorenew }}/>
            <Button icon={{ path: mdiMinus }}/> */}
          </div>
        </div>
        <DataTable 
          data={table[0]}
          div="#div_List_Cont_Typ_Adm"
          typ01={1}
        />
      </div>
    </Provider>
  );
}

export default ListItem;
