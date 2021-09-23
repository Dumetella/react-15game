import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TakenGameState from './enum/TakenGameState';
import { gameFactory } from './helpers/gamefactory';
import TileModel from './model/TileModel';
import GameMenu from './GameMenu';
import Grid from './Grid';


interface GameProps {
    size: number
    className?: string;
}

interface GameState {
    currentLevel: ReturnType<typeof gameFactory>
    totalMoves: number
    totalSeconds: number
    gameState: TakenGameState
    timer: ReturnType<typeof setInterval> | null
}

class TakenGame extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            currentLevel: [],
            totalMoves: 0,
            totalSeconds: 0,
            gameState: TakenGameState.NotStarted,
            timer: null,
        };
    }

    componentDidMount(): void {
        this.gameReset();
    }

    componentWillUnmount(): void {
        this.stopTimer();
    }

    componentDidUpdate(): void {
        if (this.state.gameState !== TakenGameState.Solved && this.isPuzzleSolved(this.state.currentLevel)) {
            this.setState({gameState: TakenGameState.Solved});
            this.stopTimer();
        }
    }

    private onTileClick(tile: TileModel): void {
        if (this.state.gameState === TakenGameState.NotStarted) {
            this.setState({
                gameState: TakenGameState.InProgress,
                timer: setInterval(() => {
                    this.setState((oldState) => {
                        return {
                            totalSeconds: oldState.totalSeconds + 1
                        };
                    });
                }, 1000),
            });
        }

        const empty = this.state.currentLevel.find((e) => {
            return e.value === -1;
        });
        if (!empty) {
            return;
        }

        let moveValid = false;
        if (tile.y + 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            moveValid = true;
        }
        else if (tile.y - 1 === empty.y && tile.x === empty.x) {
            [tile.y, empty.y] = [empty.y, tile.y];
            moveValid = true;
        }
        else if (tile.x + 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            moveValid = true;
        }
        else if (tile.x - 1 === empty.x && tile.y === empty.y) {
            [tile.x, empty.x] = [empty.x, tile.x];
            moveValid = true;
        }

        if (moveValid) {
            this.setState({
                totalMoves: this.state.totalMoves + 1,
                currentLevel: this.state.currentLevel.slice(),
            });
        }
    }

    private stopTimer(): void {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({
                timer: null
            });
        }
    }
    
    private isPuzzleSolved(level: GameState['currentLevel']): boolean {
        return level.filter(c => c.value > 0).every(c => c.value === c.y * this.props.size + c.x + 1);
    }

    private gameReset(): void {
        this.setState({
            currentLevel: gameFactory(this.props.size),
            totalMoves: 0,
            totalSeconds: 0,
            gameState: TakenGameState.NotStarted,
        });
        this.stopTimer();
    }

    render(): JSX.Element {
        const {
            currentLevel,
            totalMoves,
            totalSeconds,
            gameState,
        } = this.state;
        
        return (
            <div className={this.props.className}>
                {
                    gameState === TakenGameState.Solved
                        ? <div>
                            <h2>YOU WON</h2>
                            <button onClick={() => this.gameReset()}>Restart</button>
                        </div>
                        : null
                }
                <GameMenu onClick={() => this.gameReset()}
                    moves={totalMoves}
                    timer={totalSeconds}
                />
                <Grid
                    level={currentLevel}
                    onClick={(tile) => this.onTileClick(tile)}
                />
            </div>
        );
    }
}

export default styled(TakenGame)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
`;
