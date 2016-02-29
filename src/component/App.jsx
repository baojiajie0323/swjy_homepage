import React from 'react';
const Login = require('./login');
const Main = require('./main')

const App = React.createClass({
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
