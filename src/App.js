import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const Card = (props) =>
{
  return(
  <div style={{margin: '1em'}}>
    <img width="75" src={props.avatar_url} alt=""/>
    <div style={{ marginLeft: 10}}>
      <div style={{font: '1.25em', fontWeight:'bold'}}>
        {props.name}      
      </div>
      <div>
        {props.html_url} 
      </div>
    </div>
  </div>
  );}


const CardList = (props) =>
{
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  );
}
class Form extends Component{
  state={
    userInput: ''
  }
  handleClick= (e) => 
  {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userInput}`)
    .then(res => {this.props.onSubmit(res.data)});
    this.setState({userInput: ''});
  };
  render(){
    return(
      <form onSubmit={this.handleClick}>
        <input type="text" required value={this.state.userInput} onChange={(e)=> this.setState({userInput: e.target.value})}/>
        <button type="submit">submit</button>
      </form>
    );
  }
}
class App extends Component {
  state = {
    cards: []
  }
  addCard =(cardInfo) =>
  {
    this.setState(prevState => ({
    cards: prevState.cards.concat(cardInfo)}))
  };
  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
