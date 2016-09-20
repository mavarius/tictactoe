/**
 * @jsx React.DOM
 */

 // MVP
 // DONE: Two Players can take turns clicking squares to make moves
 // DONE: Players get indication of player turn
 // TODO: Player wins game when they make three tiles in a row
 // DONE: Players can start a new game after the game ends

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
      players: [],
      message: 'click to start new game',
      circle: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
      cross: '<i class="fa fa-times" aria-hidden="true"></i>',
    }
  },

  setMark (e) {
    const { cross, circle, turnCount, message, players } = this.state

    let thisTurn = turnCount
    let playerTurn

    if (e.target.getAttribute("class") == "gameTile" && !e.target.innerHTML) {
      let coordinates = {
        x: parseInt(e.target.getAttribute("name"))+1,
        y: parseInt(e.target.parentElement.getAttribute("name"))+1
      }

      console.log('coordinates: ', coordinates)

      if (thisTurn % 2 === 0) {
        e.target.innerHTML = cross
        playerTurn = `Current Turn: ${players[1]}`
      } else {
        e.target.innerHTML = circle
        playerTurn = `Current Turn: ${players[0]}`
      }

      thisTurn++
    }

    this.setState ({
      turnCount: thisTurn,
      message: playerTurn
    })
  },

  newGame () {
    const {theBoard, turnCount, players, message} = this.state

    let newPlayers = ['Player One', 'Player Two']
    let startTurn = `Current Turn: ${newPlayers[0]}`

    this.setState({
      theBoard: [],
      players: newPlayers,
      message: startTurn,
      turnCount: 0
    }, () => this.createBoard())
  },

  createBoard () {
    const { theBoard } = this.state

    let boardSize = 3

    let tileGen = Array(boardSize).fill().map((num, i) => {
      let elTile = <div key={i} name={i} onClick={this.setMark} className="gameTile"></div>
      return elTile
    })

    let rowGen = Array(boardSize).fill().map((num, j) => {
      let elRow = <div key={j} name={j} className="tileRow">{tileGen}</div>
      return elRow
    })

    this.setState ({
      theBoard: rowGen
    })
  },

  render () {
    const { theBoard, message } = this.state

    return (
      <div className="container">
        <h1 className="text-center">tic tac toe</h1>
        <h4 className="message text-center">{message}</h4>
          <div className="row text-center" id="gameBoard">
            <GameBoard theBoard={theBoard}/>
          </div>
          <div className="row text-center new-game">
            <button className="btn btn-primary" onClick={this.newGame}>New Game</button>
          </div>
      </div>
    )
  }
})

const GameBoard = props => {
  const { theBoard } = props

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
