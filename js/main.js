/**
 * @jsx React.DOM
 */

 // MVP
 // TODO: Two Players can take turns clicking squares to make moves
 // TODO: Players get indication of player turn
 // TODO: Player wins game when they make three tiles in a row
 // TODO: Players can start a new game after the game ends

 // EXTRA FEATURES
 // TODO: Players can enter their names
 // TODO: Players can either choose who starts first or have it randomly assigned
 // TODO: Animations!
 // TODO: Players can select a bigger board


const App = React.createClass({
  getInitialState () {
    return {
      gameState: [],
      theBoard: '',
      circle: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
      cross: '<i class="fa fa-times" aria-hidden="true"></i>',
    }
  },

  setMark (e) {
    const { cross, circle } = this.state;

    let coordinates = {
      x: e.target.name,
      y: e.target.parentElement.getAttribute("name")
    }

    e.target.innerHTML = cross
  },

  createBoard () {
    let { theBoard } = this.state;

    let boardSize = 3

    let tileGen = Array(boardSize).fill().map((num, i) => {
      let elTile = <div key={i} name={i} onClick={this.setMark} className="gameTile"></div>
      return elTile
    });

    let rowGen = Array(boardSize).fill().map((num, j) => {
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
          <div className="row text-center" id="gameBoard">
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
