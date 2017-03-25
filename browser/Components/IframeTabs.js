import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import PostwomanContainer from '../Containers/PostwomanContainer';

export const IframeTabs = (props) => {
  var stringifiedDB = "";
  if (props.docker){
    props.docker.database.forEach(obj => {
      stringifiedDB += obj.toString(); 
    })
  }

  return (
    <Tabs defaultActiveKey={1} id="IframeTabContainer">
      <Tab eventKey={1} title="Browser View">
        <div id="frame" />
      </Tab>
      <Tab eventKey={2} title="Server View">
        <PostwomanContainer handlers={props.handlers} />
        <div>{props.docker ? props.docker.json : null}</div>
      </Tab>
      <Tab eventKey={3} title="Database View">
          {props.docker ? 
            props.docker.database.map(obj => {
              return (<p key={obj.slice(6, 8)}>{obj.toString()}</p>)
            })
            : null } 
        </Tab>
    </Tabs>
  )
};
