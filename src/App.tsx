import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, Route, useRouterHistory} from "react-router";
import Homepage from "./components/homepage/Homepage";
import {History, createHistory, useBasename} from "history";
import Error404 from "./components/error404/Error_404";

import "./styles/App.less";

const browserHistory: History = useRouterHistory(useBasename(createHistory))();

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render(): React.ReactElement<any> {
        return (
            <Provider>
                <Router history={browserHistory}>
                    <Route path="/">
                        <Route path="homepage" component={Homepage}/>
                        <Route path="*" component={Error404}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("application"));

/* tslint:disable */
export default App;
/* tslint:enable */
