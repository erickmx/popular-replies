import React from "react";
import { string, number, func } from "prop-types";
import "./ListItem.css";

const ListItem = ({
  me2,
  text,
  url,
  wid,
  onClick,
  replies,
  maxValue,
  rootIndex,
  subIndent = 0
}) => (
  <li
    className="list-item__container"
    style={{ marginLeft: `${10 * subIndent}px` }}
    key={wid}
    onClick={() => onClick(rootIndex, wid)}
  >
    {me2} | {replies} | {text} | {url} | {wid} | {maxValue}
  </li>
);

ListItem.propTypes = {
  onClick: func.isRequired,
  text: string.isRequired,
  me2: number.isRequired,
  url: string.isRequired,
  subIndent: number,
  rootIndex: number,
  maxValue: number,
  replies: number,
  wid: string
};

ListItem.defaultProps = {
  rootIndex: null,
  subIndent: 0,
  maxValue: 0,
  replies: 0,
  wid: null
};

export default ListItem;
