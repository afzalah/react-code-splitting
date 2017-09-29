import * as React from "react";
import {Grid, Row, Col, Alert} from "react-bootstrap";

class Error404 extends React.Component {
    public render(): React.ReactElement<any> {
        return (
            <Grid className="error-404" fluid={true}>
                <Row>
                    <Col md={12}>
                        <Alert bsStyle="danger">
                            <h4>This page was not found (Error: 404)</h4>
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Error404;
