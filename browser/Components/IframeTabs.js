import { Tab, Tabs } from 'react-bootstrap';
import React from 'react';
import PostwomanContainer from '../Containers/PostwomanContainer';
import DatabaseTable from '../Containers/DatabaseTable';

export const IframeTabs = (props) => {
    return (
        <Tabs defaultActiveKey={1} id="IframeTabContainer">
            <Tab eventKey={1} title="Frontend View">
                <div id="frame" />
            </Tab>
            <Tab eventKey={2} title="Server View">
                <div className="tab-div">
                    <PostwomanContainer className="test" handlers={props.handlers} docker={props.docker} />
                    <div>{props.docker ? props.docker.json : null}</div>
                </div>
            </Tab>
            <Tab eventKey={3} title="Database View">
                <div className="tab-div">
                    {!props.docker ? null
                        : props.docker.database.length === 0
                        ? null
                        : <DatabaseTable database={props.docker.database} />
                    }
                </div>
            </Tab>
            <Tab eventKey={4} title="Full App View">
                { !props.docker ? null
                    : props.docker.dockerOn === false
                    ? <div className="tab-div" />
                    : <iframe className="app-frame" src={`${window.location.origin}:${props.docker.port}`} />
                }
            </Tab>
        </Tabs>
    );
};
