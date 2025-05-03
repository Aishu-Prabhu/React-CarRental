import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CarDetails from './pages/CarDetails';
import BookingHistory from './pages/BookingHistory';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/car/:id" component={CarDetails} />
          <ProtectedRoute path="/bookings" component={BookingHistory} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" component={() => <h2>404 Not Found</h2>} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
