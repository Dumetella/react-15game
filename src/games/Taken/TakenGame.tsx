import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TakenGameState from './enum/TakenGameState';
import { gameFactory } from './helpers/gamefactory';
import TileModel from './model/TileModel';
import GameMenu from './GameMenu';
import Grid from './Grid';
import TakenMoveType from './enum/TakenMoveType';


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
    private emptyTile: TileModel | null = null;
    private moveTile: TileModel | null = null;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            currentLevel: [],
            totalMoves: 0,
            totalSeconds: 0,
            gameState: TakenGameState.NotStarted,
            timer: null,
        };
        // need to have reference to the func, for document.removeEventListener() to work
        this.onKeyDownEvent = this.onKeyDownEvent.bind(this);
    }

    componentDidMount(): void {
        this.gameReset();
        document.addEventListener('keydown', this.onKeyDownEvent);
    }

    componentWillUnmount(): void {
        this.stopTimer();
        document.removeEventListener('keydown', this.onKeyDownEvent);
    }

    componentDidUpdate(): void {
        if (this.state.gameState !== TakenGameState.Solved && this.isPuzzleSolved(this.state.currentLevel)) {
            this.setState({ gameState: TakenGameState.Solved });
            this.stopTimer();
        }
    }

    private onTileClick(tile: TileModel): void {
        this.emptyTile = this.state.currentLevel.find((e) => e.value === -1) || null;
        this.moveTile = tile;

        const moveValid = [
            TakenMoveType.Up,
            TakenMoveType.Right,
            TakenMoveType.Down,
            TakenMoveType.Left,
        ].some(c => this.makeMove(c));

        if (moveValid) {
            this.updatePostMove();
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

    private isMoveValid(moveType: TakenMoveType): boolean {
        if (!this.emptyTile || !this.moveTile) {
            return false;
        }

        switch (moveType) {
            case TakenMoveType.Up:
                return this.moveTile.x === this.emptyTile.x && this.moveTile.y + 1 === this.emptyTile.y;
            case TakenMoveType.Right:
                return this.moveTile.x + 1 === this.emptyTile.x && this.moveTile.y === this.emptyTile.y;
            case TakenMoveType.Down:
                return this.moveTile.x === this.emptyTile.x && this.moveTile.y - 1 === this.emptyTile.y;
            case TakenMoveType.Left:
                return this.moveTile.x - 1 === this.emptyTile.x && this.moveTile.y === this.emptyTile.y;
            default:
                return false;
        }
    }

    private makeMove(moveType: TakenMoveType): boolean {
        if (!this.emptyTile || !this.moveTile || !this.isMoveValid(moveType)) {
            return false;
        }

        console.log(moveType);

        switch (moveType) {
            case TakenMoveType.Down:
            case TakenMoveType.Up:
                [this.moveTile.y, this.emptyTile.y] = [this.emptyTile.y, this.moveTile.y];
                break;
            case TakenMoveType.Right:
            case TakenMoveType.Left:
                [this.moveTile.x, this.emptyTile.x] = [this.emptyTile.x, this.moveTile.x];
                break;
            default:
                break;
        }
        return true;
    }

    private updatePostMove(): void {
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

        this.setState({
            totalMoves: this.state.totalMoves + 1,
            currentLevel: this.state.currentLevel.slice(),
        });
    }

    private static arrowToMoves: {
        [key: string]: TakenMoveType | undefined
    } = {
        'ArrowUp': TakenMoveType.Down,
        'ArrowRight': TakenMoveType.Right,
        'ArrowDown': TakenMoveType.Up,
        'ArrowLeft': TakenMoveType.Left,
    };

    private onKeyDownEvent(ev: KeyboardEvent): void {
        console.log(ev);
        const move = TakenGame.arrowToMoves[ev.code] ?? null;

        this.emptyTile = this.state.currentLevel.find((e) => e.value === -1) || null;
        move !== null && this.findTileForMove(move) && this.makeMove(move) && this.updatePostMove();
    }

    private findTileForMove(moveType: TakenMoveType): boolean {
        if (!this.emptyTile) {
            return false;
        }
        const empty = this.emptyTile;

        switch (moveType) {
            case TakenMoveType.Up:
                this.moveTile = this.state.currentLevel.find((e) => e.x === empty.x && e.y + 1 === empty.y) || null;
                break;
            case TakenMoveType.Right:
                this.moveTile = this.state.currentLevel.find((e) => e.x + 1 === empty.x && e.y === empty.y) || null;
                break;
            case TakenMoveType.Down:
                this.moveTile = this.state.currentLevel.find((e) => e.x === empty.x && e.y - 1 === empty.y) || null;
                break;
            case TakenMoveType.Left:
                this.moveTile = this.state.currentLevel.find((e) => e.x - 1 === empty.x && e.y === empty.y) || null;
                break;
            default:
                break;
        }

        return !!this.moveTile;
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
    justify-content: flex-start;
`;
