import React        from "react";
import classNames   from "classnames";

import styles       from "./DefaultLayout.module.scss";
import Sidebar      from "@/layouts/components/Sidebar";
import Header       from "@/layouts/components/Header";
import Rightbar     from "@/layouts/components/Rightbar";
import Content from "../components/Content/Content";

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={cx(styles.wrapper)}>
      <div className={cx(styles.container)}>
        <Header />
        <Rightbar />
        <Content>
          {children}
        </Content>
      </div>
    </section>
  );
}

export default DefaultLayout;
