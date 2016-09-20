/**
 * @jsx React.DOM
 */

 // MVP
 // DONE: Two Players can take turns clicking squares to make moves
 // DONE: Players get indication of player turn
 // DONE: Player wins game when they make three tiles in a row
 // DONE: Players can start a new game after the game ends

 // EXTRA FEATURES
 // TODO: Players can enter their names
 // TODO: Players can either choose who starts first or have it randomly assigned
 // TODO: Animations!
 // TODO: Players can select a custom board

 // EXTRA EXTRA FEATURES
 // TODO: Players can seek a harder challenge with '3D Tic Tac Toe'


const App = React.createClass({
  getInitialState () {
    return {
      currentPlayer: 0,
      gameOver: false,
      theBoard: [],
      players: [],
      message: 'click to start new game',
      circle: '<i class="fa fa-dot-circle-o" aria-hidden="true"></i>',
      cross: '<i class="fa fa-times" aria-hidden="true"></i>',
    }
  },

  newGame () {
    const {theBoard, players, message, currentPlayer, gameOver} = this.state

    let newPlayers = [{name: 'Player One', winCheck: {}}, {name: 'Player Two', winCheck: {}}]

    let startTurn = 0

    let startMessage = `Current Turn: ${newPlayers[startTurn].name}`

    this.setState({
      theBoard: [],
      currentPlayer: startTurn,
      players: newPlayers,
      message: startMessage,
      gameOver: false
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

  setMark (e) {
    const { cross, circle, message, players, currentPlayer, gameOver } = this.state

    let currP = currentPlayer
    let playerMessage

    if (e.target.getAttribute("class") === "gameTile" && !e.target.innerHTML && !gameOver) {

      let x = `x${parseInt(e.target.getAttribute("name"))+1}`
      let y = `y${parseInt(e.target.parentElement.getAttribute("name"))+1}`

      currP === 0 ? e.target.innerHTML = cross : e.target.innerHTML = circle

      // winState horizontal
      if (players[currP].winCheck[x]) {
        players[currP].winCheck[x] += 1
        if (players[currP].winCheck[x] === 3) {
          return this.winState()
        }
      } else {
        players[currP].winCheck[x] = 1
      }

      // winState vertical
      if (players[currP].winCheck[y]) {
        players[currP].winCheck[y] += 1
        if (players[currP].winCheck[y] === 3) {
          return this.winState()
        }
      } else {
        players[currP].winCheck[y] = 1
      }

      // winState diagonal
      if (Object.keys(players[currP].winCheck).length === 6) {
        return this.winState()
      }

      currP === 0 ? currP = 1 : currP = 0
      playerMessage = `Current Turn: ${players[currP].name}`
    } else {
      playerMessage = `Click New Game to reset`
    }

    this.setState ({
      currentPlayer: currP,
      message: playerMessage
    })
  },

  winState () {
    const { players, currentPlayer, theBoard, message, gameOver } = this.state

    let winMessage = `${players[currentPlayer].name} WINS!`

    this.setState({
      message: winMessage,
      gameOver: true
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
