import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import HTMLEditor from '../Containers/HTMLEditor';
import CSSEditor from '../Containers/CSSEditor';
import JSEditor from '../Containers/JSEditor';
import ServerEditor from '../Containers/ServerEditor';
import DatabaseEditor from '../Containers/DatabaseEditor';

export const FirepadTabs = (props) => {
  // added handleclick to test refreshing code mirror which was passed down as props
  // does not work not but might need later
  const handleClick = (event) => {
    // console.log('event', event.target.text);
    // setTimeout(() => {
    //   console.log('in set timeout');
      // props.codemirror[1].refresh();
    // }, 1)
  }

  return (
    <div onClick={handleClick}>
      <Tabs defaultActiveKey={1} id="FirepadTabContainer">
        <Tab eventKey={1} title="HTML">
          <HTMLEditor />
          </Tab>
        <Tab eventKey={2} title="CSS">
          <CSSEditor />
          </Tab>
        <Tab eventKey={3} title="JS">
          <JSEditor />
        </Tab>
        <Tab eventKey={4} title="Server">
          <ServerEditor />
        </Tab>
        <Tab eventKey={5} title="Database">
          <DatabaseEditor />
        </Tab>
      </Tabs>
    </div>
  )
};
