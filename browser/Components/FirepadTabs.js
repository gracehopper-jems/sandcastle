import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import HTMLEditor from '../Containers/HTMLEditor';
import CSSEditor from '../Containers/CSSEditor';
import JSEditor from '../Containers/JSEditor';
import ServerEditor from '../Containers/ServerEditor';
import DatabaseEditor from '../Containers/DatabaseEditor';

export const FirepadTabs = (props) => {

  const handleClick = (event) => {
  }

  return (
    <div onClick={handleClick}>
      <Tabs defaultActiveKey={1} id="FirepadTabContainer">
        <Tab eventKey={1} title="HTML Editor">
          <HTMLEditor />
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
  )
};
