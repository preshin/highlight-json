import React, { Component } from "react";
import "./App.css";
import data from "./json/data_file.json";
import highlight from "./json/highlight.json";
import _ from "lodash";

class App extends Component {
  state = {
    highlightData: Object.keys(highlight),
    data: JSON.stringify(data)
  };

  highlightString(string, title) {
    return highlight["formattedAnnotations"].map(
      ({ annotations: { annotations } }) => {
        if (annotations[title].inclusion.includes(string)) {
          return <span style={{ backgroundColor: "green" }}>{string} </span>;
        } else {
          if (annotations[title].exclusion.includes(string)) {
            return <span style={{ backgroundColor: "red" }}>{string} </span>;
          } else {
            return <span>{string} </span>;
          }
        }
      }
    );
  }

  displayObject(obj, title) {
    const objKeys = _.keys(obj);
    return objKeys.map(key => {
      const isString = typeof obj[key] === "string";
      if (isString) {
        const strArr = obj[key].split(" ");
        return (
          <div>
            <div>{key}</div>
            {strArr.map(str => {
              return <span>{this.highlightString(str, title)}</span>;
            })}
          </div>
        );
      }
    });
  }

  displayData(dataKey, isArray, title) {
    if (isArray) {
      return dataKey.map(obj => {
        return this.displayObject(obj, title);
      });
    } else return this.displayObject(dataKey, title);
  }

  displayTitlewithData(dataKeys, title) {
    const isArray = Array.isArray(dataKeys);
    return (
      <div>
        <div>Title: {title}</div>
        <br />
        <br />
        <div>{this.displayData(dataKeys, isArray, title)}</div>
      </div>
    );
  }
  disHighligt() {
    return highlight["formattedAnnotations"].map(
      ({ annotations: { annotations } }) => {
        const keys = _.keys(annotations);
        return keys.map(k => {
          const dataKeys = _.get(
            data,
            `deIdentifiedFile.file[${k}].parser`,
            []
          );
          return this.displayTitlewithData(dataKeys, k);
        });
      }
    );
  }
  render() {
    return <div>{this.disHighligt()}</div>;
  }
}

export default App;
