import React from "react";
import styles from "./mypage.module.scss";
import Header from "../../components/header/header";
import Content from "../../components/content/content";

const MyPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
    </div>
  );
};

export default MyPage;
