import React from "react";
import styles from "./Tags.module.css";
import Tag from "./Tag/Tag";

const Tags = props => {
  let tagList = null;
  if (props.tagList) {
    tagList = Object.keys(props.tagList)
      .sort((a, b) => {
        if (props.tagList[a] < props.tagList[b]) {
          return 1;
        }
        if (props.tagList[a] > props.tagList[b]) {
          return -1;
        }
      })
      .map((item, i) => {
        if (i < 5 && props.tagList[item] !== 0) {
          return (
            <Tag>
              <span>
                {item.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
                  return str.toUpperCase();
                })}
              </span>
              <span className={styles.peopleCount}>{props.tagList[item]}</span>
            </Tag>
          );
        } else {
          return null;
        }
      });
  }
  return (
    <React.Fragment>
      <div className={styles.wrapTags}>{tagList}</div>
      <div className={styles.tagStyle}>
        <span>
          <i className={["fas fa-plus", styles.iconHover].join(" ")} />
          &nbsp;Add a Tag
        </span>
      </div>
    </React.Fragment>
  );
};

export default Tags;
