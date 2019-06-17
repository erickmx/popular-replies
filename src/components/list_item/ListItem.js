import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faBullhorn,
  faReply,
  faHeart,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { string, number, func } from "prop-types";
import "./ListItem.css";

const ListItem = ({
  me2,
  url,
  wid,
  text,
  onClick,
  replies,
  maxValue,
  rootIndex,
  subIndent = 0
}) => (
  <li
    className="list-item__container"
    style={{
      marginLeft: `${10 * subIndent}px`
    }}
    key={wid}
    onClick={() => onClick(rootIndex, wid)}
  >
    <div className="list-item__user">
      <FontAwesomeIcon icon={faUser} /> {me2}
    </div>
    <div className="list-item__text">
      {text}{" "}
      <a href={url}>
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </a>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        marginLeft: "5px",
        marginBottom: "5px"
      }}
    >
      <div className="padding-5">
        <FontAwesomeIcon icon={faReply} />
        {replies}
      </div>
      {wid && (
        <div className="padding-5" style={{ marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faBullhorn} /> {wid}
        </div>
      )}
      <div className="padding-5">
        <FontAwesomeIcon
          style={{ color: "#d30000", marginLeft: "10px" }}
          icon={faHeart}
        />{" "}
        {maxValue}
      </div>
    </div>
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
