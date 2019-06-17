import React, { Component } from "react";
import ListReplies from "./components/list_replies/ListReplies";
import { fetchPopular, mapData, fetchReplies } from "./utils/api";
import ListItem from "./components/list_item/ListItem";
import { findNode, isLeaf, findMaxSum } from "./utils/treeUtils";
import "./App.css";

class App extends Component {
  state = {
    listPopulars: []
  };

  componentDidMount() {
    fetchPopular({ limit: 10 })
      .then(result => {
        const listPopulars = result.popular.map(mapData);
        this.setState({ listPopulars });
      })
      .catch(err => {
        console.error("COMPONENT_DID_MOUNT_APP", err);
      });
  }

  handleClickPopulars = async rootIndex => {
    try {
      const { listPopulars } = this.state;
      let sons;
      if (isLeaf(listPopulars[rootIndex])) {
        const result = await fetchReplies({
          limit: 10,
          wid: listPopulars[rootIndex].data.wid
        });
        sons = result.replies.map(mapData);
      }
      listPopulars[rootIndex].sons = sons;
      findMaxSum(listPopulars[rootIndex]);
      this.setState({ listPopulars });
    } catch (error) {
      console.error("HANDLE_CLICK_APP", error);
    }
  };

  handleClickReplies = async (rootIndex, wid) => {
    try {
      const { listPopulars } = this.state;
      const node = listPopulars[rootIndex];
      this.findNodeAsync(node, wid).then(async finded => {
        await this.insertReplies(finded);
        findMaxSum(node);
        this.setState({ listPopulars });
      });
    } catch (error) {
      console.error("HANDLE_CLICK_REPLIES", error);
    }
  };

  findNodeAsync = (node, wid) => {
    return new Promise((resolve, reject) => {
      findNode(node, wid, resolve);
    });
  };

  insertReplies = async node => {
    try {
      if (isLeaf(node)) {
        const response = await fetchReplies({ wid: node.data.wid, limit: 10 });
        const sons = response.replies.map(mapData);
        node.sons = sons;
      }
    } catch (error) {
      console.error("INSERT_REPLIES", error);
    }
  };

  handleClick = (rootIndex, wid) => {
    if (!wid) {
      return this.handleClickPopulars(rootIndex);
    }
    return this.handleClickPopulars(rootIndex, wid);
  };

  render() {
    const { listPopulars } = this.state;
    return (
      <>
        <h1 style={{ fontSize: "1.5rem", color: "#3e3e3e", marginLeft: "5%" }}>
          Popular Replies
        </h1>
        <ul>
          {listPopulars.map((whisper, idx) => {
            return (
              <>
                <ListItem
                  key={whisper.data.wid}
                  me2={whisper.data.me2}
                  replies={whisper.data.replies}
                  text={whisper.data.text}
                  url={whisper.data.url}
                  // wid={whisper.data.wid}
                  onClick={this.handleClickPopulars}
                  rootIndex={idx}
                  maxValue={whisper.maxValue || whisper.data.replies}
                />
                {whisper.sons.length > 0 && (
                  <ListReplies
                    indent={1}
                    replies={whisper.sons}
                    rootIndex={idx}
                    handleClickReplies={this.handleClickReplies}
                  />
                )}
              </>
            );
          })}
        </ul>
      </>
    );
  }
}

export default App;
