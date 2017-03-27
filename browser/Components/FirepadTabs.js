import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';

import Editors from './Editors';

export const FirepadTabs = () => {

  const handleClick = (event) => {
  }

  let HTMEditor = Editors[0];
  let CSSEditor = Editors[1];
  let JSEditor = Editors[2];
  let ServerEditor = Editors[3];
  let DatabaseEditor = Editors[4];

  return (
    <div onClick={handleClick}>
      <Tabs defaultActiveKey={1} id="FirepadTabContainer">
        <Tab eventKey={1} title="HTML Editor">
          <HTMEditor />
        </Tab>
        <Tab eventKey={2} title="CSS Editor">
          <CSSEditor />
        </Tab>
        <Tab eventKey={3} title="JS Editor">
          <JSEditor />
        </Tab>
        <Tab eventKey={4} title="Server Editor">
          <ServerEditor />
        </Tab>
        <Tab eventKey={5} title="Models Editor">
          <DatabaseEditor />
        </Tab>
      </Tabs>
    </div>
  );
};
