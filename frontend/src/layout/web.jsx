import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import AuthNavbar from "../components/web/header.jsx";
import AuthFooter from "../components/web/footer.jsx";

import routes from "../routes.js";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/web") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
       
          <AuthNavbar />
       
      
          <Container >
            
            <Row className="justify-content-center">
            
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
    
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
