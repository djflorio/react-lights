import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Light(props) {
    return (
        <span className={"light " + (props.value ? "light--on" : "light--off")} onClick={props.onClick}></span>
    );
}

class Board extends React.Component {
    renderLight(i) {
        const value = this.props.lights[i];
        return (
            <Light
                value={value}
                onClick={() => this.props.onClick(i)}/>
        );
    }
    render() {
        return (
            <div className="board">
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

    render() {
        return (
            <div>
                <h1>{this.state.numMoves}</h1>
                <h2>{this.state.gameWon ? "Winner!" : ""}</h2>
                <Board
                    lights={this.state.lights}
                    onClick={(i) => this.handleClick(i)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);