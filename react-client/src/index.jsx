import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import MessageView from './components/MessageView.jsx';
import Message from './components/Message.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      message:'',
      username: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.ajaxGet = this.ajaxGet.bind(this);
  }

  componentDidMount() {
    var originalThis = this;
    var username = prompt('Enter your name:', 'Anonymous');
    this.setState({username: username})
    originalThis.ajaxGet(function(data) {
      originalThis.setState({items:data});
      console.log('Component Did Mount data', data)
    });
  }
  
  ajaxGet (callback) {
    var originalThis = this;
    $.ajax({
      method: "GET",
      url: "http://127.0.0.1:3000/items",
      success: function(data) {
        console.log("success get request with data", JSON.parse(data))
        callback( JSON.parse(data) )
      },
      error: function(error) {
        console.log("failed get request.")
      }
    });
  }

  onChange (e) {
    // when onChange is invoked, change current state
    this.setState({message:e.target.value})
  }

  onClick () {
    var originalThis = this;
    console.log("button clicked");
    // some AJAX request;
    $.ajax({
      method: "POST",
      url: "http://127.0.0.1:3000/db",
      data: JSON.stringify( { "username":originalThis.state.username, "message": this.state.message} ),
      contentType: "application/json",
      success: function(data) {
        console.log("ajax post request sucess", data)
        originalThis.ajaxGet(function(data) {
          originalThis.setState({items:data});
        });
        
      },
      error: function(error) {
        console.log("ajax post request failed", error);
      }
    })
  }

  render () {
    return (<div>
      <Message value={this.state.value} onChange={this.onChange} clicked={this.onClick} />
      <h1>Item List</h1>
      <List items={this.state.items}/>
      <MessageView msgList={this.state.items} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));