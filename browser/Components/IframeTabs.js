import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';

export const IframeTabs = () => {
  return (
    <Tabs defaultActiveKey={1} id="IframeTabContainer">
      <Tab eventKey={1} title="Browser View">
        <div id="frame" />
      </Tab>
      <Tab eventKey={2} title="Server View">
        <iframe id="serveriframe" src="http://localhost:3000/containerTest"></iframe>
        </Tab>
      <Tab eventKey={3} title="Database View">Database</Tab>
    </Tabs>
  )
};
