import React from 'react';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import TestUpload from './components/TestUpload';
import RequestsCard from './components/RequestsCard';
import TransferedCard from './components/TransferedCard';
import Evacuation from './components/Evacuations'
import VerifyCard from './components/VerifyCard';
import ResolvedCard from './components/ResolvedCard';
import SideBar from './components/SideBar';
import OngoingCard from './components/OngoingCard';
import TransferedOngoingCard from './components/TransferedOngoingCard';
import TransferedResolvedCard from './components/TransferedResolvedCard';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PriavateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MapContainer from './components/Map';
import VerifiedUsersCard from './components/VerifiedUsersCard';


const App = () => {
  return (
    <Container
      className='container-fluid d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '100%' }}>

        <Router>
          <AuthProvider>
            <SideBar>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <PrivateRoute exact path='/request' component={RequestsCard} />
                <PrivateRoute exact path='/resolved' component={ResolvedCard} />
                <PrivateRoute exact path='/on-going' component={OngoingCard} />
                <PrivateRoute exact path='/transfered' component={TransferedCard} />
                <PrivateRoute exact path='/transfered-ongoing' component={TransferedOngoingCard} />
                <PrivateRoute exact path='/transfered-resolved' component={TransferedResolvedCard} />
                <PrivateRoute exact path='/map' component={MapContainer} />
                <PrivateRoute exact path='/evacuation' component={Evacuation} />
                <PrivateRoute exact path='/verify-account' component={VerifyCard}/>
                <PrivateRoute exact path='/verified-users' component={VerifiedUsersCard}/>
                <PrivateRoute exact path='/upload' component={TestUpload} />
                <PrivateRoute path='/forgotpassword' component={ForgotPassword} />
              </Switch>
            </SideBar>
          </AuthProvider >
        </Router>
      </div>
    </Container>
  )
}


export default App;