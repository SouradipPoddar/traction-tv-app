import React from "react";
import styles from "./AddTagModal.module.css";
import Checkbox from "../../UI/Checkbox/Checkbox";
import Button from "../../UI/Button/Button";

const AddTagModal = props => {
  let tagsForm = null;
  if (props.tagList) {
    tagsForm = Object.keys(props.tagList).map((item, i) => {
      return (
        <div className={styles.listItem} key={i}>
          <Checkbox
            checked={props.valueArray[i]}
            clicked={() => props.checkValues(i)}
          />
          <span>
            {item.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
              return str.toUpperCase();
            })}
          </span>
        </div>
      );
    });
  }

  return (
    <div
      className={[
        styles.modalStyles,
        props.show ? null : styles.hideModal
      ].join(" ")}
    >
      <div className={styles.header}>
        <span>Choose Appropriate Tags</span>
      </div>
      {tagsForm}
      <Button click={props.submit}>SUBMIT</Button>
    </div>
  );
};

export default AddTagModal;
