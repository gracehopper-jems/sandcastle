import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import PostwomanContainer from '../Containers/PostwomanContainer';

export const IframeTabs = (props) => {
  console.log('props', props);
  return (
    <Tabs defaultActiveKey={1} id="IframeTabContainer">
      <Tab eventKey={1} title="Browser View">
        <div id="frame" />
      </Tab>
      <Tab eventKey={2} title="Server View">
        <PostwomanContainer handlers={props.handlers} />
        <div>{props.docker ? props.docker.json : null}</div>
        {/*<iframe id="serveriframe" src="http://localhost:3000/containerGet"></iframe>*/}
      </Tab>
      <Tab eventKey={3} title="Database View">Database</Tab>
    </Tabs>
  )
};
