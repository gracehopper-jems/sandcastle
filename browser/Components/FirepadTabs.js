import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import HTMLEditor from '../Containers/HTMLEditor';
import CSSEditor from '../Containers/CSSEditor';
import JSEditor from '../Containers/JSEditor';
import ServerEditor from '../Containers/ServerEditor';
import DatabaseEditor from '../Containers/DatabaseEditor';

export const FirepadTabs = (props) => {
  return (
    <Tabs defaultActiveKey={2} id="FirepadTabContainer">
      <Tab eventKey={1} title="HTML">
        <HTMLEditor user={props.user} code={props.code} handlers={props.handlers} />
        </Tab>
      <Tab eventKey={2} title="CSS">
        <CSSEditor user={props.user} code={props.code} handlers={props.handlers} />
        </Tab>
      <Tab eventKey={3} title="JS">
        <JSEditor user={props.user} code={props.code} handlers={props.handlers} />
      </Tab>
      <Tab eventKey={4} title="Server">
        <ServerEditor user={props.user} code={props.code} handlers={props.handlers} />
      </Tab>
      <Tab eventKey={5} title="Database">
        <DatabaseEditor user={props.user} code={props.code} handlers={props.handlers} />
      </Tab>
    </Tabs>
  )
};
