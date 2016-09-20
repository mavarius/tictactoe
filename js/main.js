/**
 * @jsx React.DOM
 */

 // MVP
 // TODO: Two Players can take turns clicking squares to make moves
 // TODO: Players get indication of player turn
 // TODO: Player wins game when they make three tiles in a row
 // TODO: Players can start a new game

 // EXTRA FEATURES
 // TODO: Players can enter their names
 // TODO: Players can either choose who starts first or have it randomly assigned
 // TODO: Animations!
 // TODO: Players can select a bigger board


const App = React.createClass({
  getInitialState () {
    return {
      gameState: [],
      theBoard: ''
    }
  },

  playMark (e) {
    let coordinates = {
      x: e.target.name,
      y: e.target.parentElement.getAttribute("name")
    }

    console.log('coordinates: ', coordinates)
  },

  createBoard () {
    let { theBoard } = this.state;

    let tileGen = Array(3).fill().map((num, i) => {
      let elTile = <button key={i} name={i} onClick={this.playMark} className="gameTile"></button>
      return elTile
    });

    let rowGen = Array(3).fill().map((num, j) => {
      let elRow = <div key={j} name={j} className="tileRow">{tileGen}</div>
      return elRow
    });

    this.setState ({
      theBoard: rowGen
    })
  },

  render () {

    return (
      <div className="container">
        <h1 className="text-center">tic tac toe</h1>
          <div className="row text-center">
            <GameBoard gameState={this.state.gameState} theBoard={this.state.theBoard}/>
          </div>
          <div className="row text-center new-game">
            <button className="btn btn-primary" onClick={this.createBoard}>New Game</button>
          </div>
      </div>
    )
  }
})

const GameBoard = props => {
  const { gameState, theBoard } = props;

  return (
    <div className="row">
      {theBoard}
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

// <div className="tileRow">
//   <div className="gameTile"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></div>
//   <div className="gameTile"><i className="fa fa-times" aria-hidden="true"></i></div>
//   <div className="gameTile"></div>
// </div>
// <div className="tileRow">
//   <div className="gameTile"></div>
//   <div className="gameTile"></div>
//   <div className="gameTile"></div>
// </div>
// <div className="tileRow">
//   <div className="gameTile"></div>
//   <div className="gameTile"></div>
//   <div className="gameTile"></div>
// </div>
