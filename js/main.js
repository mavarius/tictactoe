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
      turnCount: 0,
      theBoard: [],
      circle: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
      cross: '<i class="fa fa-times" aria-hidden="true"></i>',
    }
  },

  setMark (e) {
    const { cross, circle, turnCount } = this.state;

    let coordinates = {
      x: parseInt(e.target.getAttribute("name"))+1,
      y: parseInt(e.target.parentElement.getAttribute("name"))+1
    }
    console.log('coordinates: ', coordinates)

    let thisTurn = turnCount

    if (thisTurn % 2 === 0) {
      e.target.innerHTML = cross
    } else {
      e.target.innerHTML = circle
    }

    thisTurn++

    this.setState ({
      turnCount: thisTurn
    })
  },

  newGame () {
    const {theBoard, turnCount} = this.state;

    this.setState({
      theBoard: [],
      turnCount: 0
    }, () => this.createBoard())    
  },

  createBoard () {
    const { theBoard } = this.state;

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
            <GameBoard theBoard={this.state.theBoard}/>
          </div>
          <div className="row text-center new-game">
            <button className="btn btn-primary" onClick={this.newGame}>New Game</button>
          </div>
      </div>
    )
  }
})

const GameBoard = props => {
  const { theBoard } = props;

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
