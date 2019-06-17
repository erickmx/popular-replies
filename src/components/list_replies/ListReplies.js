import React, { Component } from "react";
import { shape, arrayOf, number, func, string, array } from "prop-types";
import ListItem from "../list_item/ListItem";

class ListReplies extends Component {
  render() {
    const { replies, indent, rootIndex, handleClickReplies } = this.props;
    return (
      <div style={{ overflow: "auto" }}>
        {replies.map(reply => {
          return (
            <>
              <ListItem
                key={reply.data.wid}
                me2={reply.data.me2}
                text={reply.data.text}
                replies={reply.data.replies}
                url={reply.data.url}
                wid={reply.data.wid}
                rootIndex={rootIndex}
                onClick={handleClickReplies}
                subIndent={indent}
                maxValue={reply.maxValue || reply.data.replies}
              />
              {reply.sons.length > 0 && (
                <ListReplies
                  indent={indent + 1}
                  replies={reply.sons}
                  rootIndex={rootIndex}
                  handleClickReplies={handleClickReplies}
                />
              )}
            </>
          );
        })}
      </div>
    );
  }
}

ListReplies.propTypes = {
  replies: arrayOf(
    shape({
      data: shape({
        replies: number.isRequired,
        text: string.isRequired,
        me2: number.isRequired,
        url: string.isRequired,
        wid: string.isRequired
      }),
      sons: array,
      maxValue: number
    })
  ).isRequired,
  indent: number.isRequired,
  rootIndex: number.isRequired,
  handleClickReplies: func.isRequired
};

export default ListReplies;
