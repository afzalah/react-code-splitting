import * as React from "react";
import {Component, ReactElement} from "react";
import {IHomepageProps} from "./Homepage.specs";

class Homepage extends Component<IHomepageProps, null> {
    public render(): ReactElement<any> {
        return (
            <div>
                <h1>Application is working</h1>
            </div>
        );
    }
}

export default Homepage;
