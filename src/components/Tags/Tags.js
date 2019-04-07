import React from "react";
import styles from "./Tags.module.css";
import Tag from "./Tag/Tag";
import AddTagModal from "./AddTagModal/AddTagModal";

const Tags = props => {
  let tagList = null;

  if (props.tagList) {
    let tagCheck = Object.keys(props.tagList).reduce((acc, curr) => {
      return acc + props.tagList[curr];
    }, 0);

    console.log(tagCheck);
    if (tagCheck === 0) {
      tagList = (
        <Tag>
          <span>No Tags Available</span>
        </Tag>
      );
    } else {
      tagList = Object.keys(props.tagList)
        .sort((a, b) => {
          if (props.tagList[a] < props.tagList[b]) {
            return 1;
          }
          if (props.tagList[a] > props.tagList[b]) {
            return -1;
          }

          if (props.tagList[a] === props.tagList[b]) {
            return 1;
          }
          return 1;
        })
        .map((item, i) => {
          if (i < 5 && props.tagList[item] !== 0) {
            return (
              <Tag key={i}>
                <span>
                  {item.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
                    return str.toUpperCase();
                  })}
                </span>
                <span className={styles.peopleCount}>
                  {props.tagList[item]}
                </span>
              </Tag>
            );
          } else {
            return null;
          }
        });
    }
    console.log(tagList);
  }
  return (
    <React.Fragment>
      <div className={styles.wrapTags}>{tagList}</div>
      <div className={styles.tagStyle} onClick={props.addButtonClick}>
        <span>
          <i className={["fas fa-plus", styles.iconHover].join(" ")} />
          &nbsp;Add a Tag
        </span>
      </div>
      <AddTagModal
        show={props.showNewTagModal}
        tagList={props.tagList}
        valueArray={props.valueArray}
        checkValues={props.checkboxValues}
        submit={props.addTag}
      />
    </React.Fragment>
  );
};

export default Tags;
