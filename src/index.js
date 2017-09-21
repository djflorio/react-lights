import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Light(props) {
    return (
        <span className={"light " + (props.value ? "light--" + props.color : "light--off")} onClick={props.onClick}></span>
    );
}

class Panel extends React.Component {
    render() {
        return (
            <div className="panel">
                <h3 className="panel__title">LIGHTS ON</h3>
                <p className="panel__subtitle">A "Lights Out" clone by <a className={this.props.color + "-text"} href="http://www.danflorio.com" target="_blank">Dan Florio</a></p>
                <p>MOVES: {this.props.numMoves}</p>
                <p>{this.props.gameWon ? "Winner!" : ""}</p>
                <br/>
                <p>Color Theme</p>
                <ul className="panel__color-buttons">
                    <li className={"panel__color-button " + (this.props.color == "yellow" ? "select--yellow" : "")} onClick={() => this.props.onColorChange("yellow")}>
                        YELLOW
                    </li>
                    <li className={"panel__color-button " + (this.props.color == "green" ? "select--green" : "")}  onClick={() => this.props.onColorChange("green")}>
                        GREEN
                    </li>
                    <li className={"panel__color-button " + (this.props.color == "red" ? "select--red" : "")}  onClick={() => this.props.onColorChange("red")}>
                        RED
                    </li>
                    <li className={"panel__color-button " + (this.props.color == "blue" ? "select--blue" : "")}  onClick={() => this.props.onColorChange("blue")}>
                        BLUE
                    </li>
                </ul>
            </div>
        );
    }
}

class Board extends React.Component {
    renderLight(i) {
        const value = this.props.lights[i];
        return (
            <Light
                value={value}
                color={this.props.color}
                onClick={() => this.props.onClick(i)}/>
        );
    }
    render() {
        return (
            <div className="board">
                <p className="board__message">
                    Clicking a light will flip all adjacent lights.<br/>
                    Can you turn all of the lights <span className={this.props.color + "-bright-text"}>on</span>?
                </p>
                <div className="board-row">
                    {this.renderLight(0)}
                    {this.renderLight(1)}
                    {this.renderLight(2)}
                    {this.renderLight(3)}
                    {this.renderLight(4)}
                </div>
                <div className="board-row">
                    {this.renderLight(5)}
                    {this.renderLight(6)}
                    {this.renderLight(7)}
                    {this.renderLight(8)}
                    {this.renderLight(9)}
                </div>
                <div className="board-row">
                    {this.renderLight(10)}
                    {this.renderLight(11)}
                    {this.renderLight(12)}
                    {this.renderLight(13)}
                    {this.renderLight(14)}
                </div>
                <div className="board-row">
                    {this.renderLight(15)}
                    {this.renderLight(16)}
                    {this.renderLight(17)}
                    {this.renderLight(18)}
                    {this.renderLight(19)}
                </div>
                <div className="board-row">
                    {this.renderLight(20)}
                    {this.renderLight(21)}
                    {this.renderLight(22)}
                    {this.renderLight(23)}
                    {this.renderLight(24)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            lights: [
                1,0,0,1,0,
                0,0,0,0,1,
                1,0,1,1,0,
                0,1,1,0,0,
                0,1,1,1,0
            ],
            color: "yellow",
            numMoves: 0,
            gameWon: false
        }
    }

    handleClick(i) {
        if (this.state.gameWon) {
            return;
        }
        const lights = this.state.lights.slice();
        lights[i] = lights[i] ? 0 : 1;
        if (i >= 5) {
            lights[i-5] = lights[i-5] ? 0 : 1;
        }
        if (i >= 1 && i % 5 !== 0 && i !== 0) {
            lights[i-1] = lights[i-1] ? 0 : 1;
        }
        if (i <= 19) {
            lights[i+5] = lights[i+5] ? 0 : 1;
        }
        if (i <= 23 && (i+1) % 5 !== 0) {
            lights[i+1] = lights[i+1] ? 0 : 1;
        }

        this.setState({
            lights: lights,
            numMoves: this.state.numMoves + 1
        });

        if (!lights.includes(0)) {
            this.setState({
                gameWon: true
            });
        }
    }

    handleColorChange(c) {
        this.setState({
            color: c
        });
    }

    render() {
        return (
            <div>
                <Panel
                    numMoves={this.state.numMoves}
                    gameWon={this.state.gameWon}
                    color={this.state.color}
                    onColorChange={(c) => this.handleColorChange(c)}/>
                <Board
                    lights={this.state.lights}
                    onClick={(i) => this.handleClick(i)}
                    color={this.state.color}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);