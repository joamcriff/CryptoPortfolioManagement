import React from "react";
import styles from "./content.module.scss";
import SideContent from "../side_content/sideContent";
import SectionContent from "../section_content/sectionContent";

const Content = () => {
  return (
    <div className={styles.content}>
      <div className={styles.division}>
        <SideContent />
        <SectionContent />
      </div>
    </div>
  );
};

export default Content;
