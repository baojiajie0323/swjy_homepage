import React from 'react';
const Login = require('./login');
const Main = require('./main');
const Multiwnd = require('./multiwnd');

const App = React.createClass({
  componentDidMount(){
    console.log('App componentDidMount');
  },
  render() {
    return (
      <div id="container">
        <Login />
        <Main />
      </div>
    );
  },
});

export default App;
