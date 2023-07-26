import React from 'react';
import './App.css';

class App extends React.Component {
  state = { count: null };
  callApi = async () => {
    const response = await fetch("/api/count")
    const body = await response.json();
    if (response.status != 200) {
      throw Error(body.message)
    }
    return body;
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ count: res.count }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            This page has been visited {this.state.count} times.
          </p>
        </header>
      </div>
    )
  }
}

export default App;
