import React from 'react';
import './custom.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import Nav from './components/nav.component';
import Login from './Login';
import Register from './components/register.component';
/*import {TruckRunSchedule} from './components/Calendar/TruckRunSchedule';*/
import { truckinfo } from './components/Calendar/TruckRunSchedule';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';

 
 

function App() {
 
  
    return (
        <BrowserRouter>
            {/*<div className="App">*/}
                <Nav />
                <Layout>
                    <Route exact path="/TruckRunSchedule" component={truckinfo} />

                </Layout>
                {/*<div className="auth-wrapper">*/}
                {/*    <div className="auth-inner">*/}
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/Login" component={Login} />
                            <Route exact path="/register" component={Register} />                          

                        </Switch> 

                {/*    </div>*/}

                {/*</div>*/}

           {/* </div>*/}
            
            </BrowserRouter>
     
      
    );
 
}
export default App;
