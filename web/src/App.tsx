import * as React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider>
            <AppBar title="Olá"/>
        </MuiThemeProvider>
    );
  }
}

export default App;
