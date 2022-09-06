import React from "react";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {typeOfObject} from "../../utils/format";
import {TYPE} from "../../constants/type";
import {v4 as uuidv4} from 'uuid';

const transferJsonDict = (jsonDict) => {
  let children = undefined;
  return Object.keys(jsonDict).map(key => {
    let value = jsonDict[key];
    switch (typeOfObject(value)) {
      case TYPE.STRING: {
        children = createTreeNode(value);
        break;
      }
      case TYPE.DICT: {
        children = transferJsonDict(value);
        break;
      }
      case TYPE.ARRAY: {
        children = transferJsonArray(value);
        break;
      }
      default: {
        key = String(key);
        break;
      }
    }
    return (<TreeItem
      key={uuidv4()}
      nodeId={uuidv4()}
      label={key}
      children={children}
    />)
  })
}

const transferJsonArray = (jsonArray) => {
  let children = undefined;
  return jsonArray.map(iterm => {
    switch (typeOfObject(iterm)) {
      case TYPE.STRING: {
        return createTreeNode(iterm);
      }
      case TYPE.DICT: {
        children = transferJsonDict(iterm);
        return (<TreeItem
          key={uuidv4()}
          nodeId={uuidv4()}
          label={"{}"}
          children={children}
        />);
      }
      case TYPE.ARRAY: {
        children = transferJsonArray(iterm);
        return (<TreeItem
          key={uuidv4()}
          nodeId={uuidv4()}
          label={"[]"}
          children={children}
        />);
      }
      default: {
        return createTreeNode(String(iterm))
      }
    }
  })
}

const createTreeNode = (value) => {
  return (<TreeItem
    key={uuidv4()}
    nodeId={uuidv4()}
    label={value}
    children={undefined}
  />);
}

const getJsonTreeItem = (value) => {
  switch (typeOfObject(value)) {
    case TYPE.STRING: {
      return createTreeNode(value)
    }
    case TYPE.DICT: {
      return transferJsonDict(value)
    }
    case TYPE.ARRAY: {
      return transferJsonArray(value)
    }
    default: {
      return createTreeNode(String(value));
    }
  }
}

const TreeCell = ({value}) => {
  if (!value) {
    return "None"
  }
  return (<TreeView
    defaultCollapseIcon={<ExpandMoreIcon/>}
    defaultExpandIcon={<ChevronRightIcon/>}
  >
    {getJsonTreeItem(value)}
  </TreeView>);
};

export default TreeCell;
