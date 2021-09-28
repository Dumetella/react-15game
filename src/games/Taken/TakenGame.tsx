import React from 'react';
import styled from 'styled-components';
import TakenGameState from './enum/TakenGameState';
import { gameFactory, GameField } from './helpers/gamefactory';
import TileModel from './model/TileModel';
import GameMenu from './GameMenu';
import Grid from './Grid';
import TakenMoveType from './enum/TakenMoveType';
import GameStats from './GameStats';


interface GameProps {
    size: number
    className?: string;
}

interface GameState {
    currentLevel: GameField
    totalMoves: number
    totalSeconds: number
    gameState: TakenGameState
    timer: ReturnType<typeof setInterval> | null
    movesHistory: TakenMoveType[]
}

class TakenGame extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            currentLevel: gameFactory(props.size),
            totalMoves: 0,
            totalSeconds: 0,
            gameState: TakenGameState.NotStarted,
            timer: null,
            movesHistory: [],
        };
        // need to have reference to the func, for document.removeEventListener() to work
        this.onKeyDownEvent = this.onKeyDownEvent.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener('keydown', this.onKeyDownEvent);
    }

    componentWillUnmount(): void {
        this.stopTimer();
        document.removeEventListener('keydown', this.onKeyDownEvent);
    }

    componentDidUpdate(): void {
        if (this.state.gameState !== TakenGameState.Solved && this.isPuzzleSolved()) {
            this.setState({ gameState: TakenGameState.Solved });
            this.stopTimer();
        }
    }

    private onTileClick(tile: TileModel): void {
        const empty = this.state.currentLevel.empty;

        if (tile.x === empty.x && tile.y === empty.y + 1) {
            this.makeMove(tile, TakenMoveType.Up);
        } else if (tile.x === empty.x + 1 && tile.y === empty.y) {
            this.makeMove(tile, TakenMoveType.Right);
        } else if (tile.x === empty.x && tile.y === empty.y - 1) {
            this.makeMove(tile, TakenMoveType.Down);
        } else if (tile.x === empty.x - 1 && tile.y === empty.y) {
            this.makeMove(tile, TakenMoveType.Left);
        }
    }

    private onKeyDownEvent(ev: KeyboardEvent): void {
        let tile: TileModel | undefined;
        let move: TakenMoveType | undefined;
        const {
            empty,
            tiles,
        } = this.state.currentLevel;

        if (ev.code === 'ArrowDown' || ev.code === 'KeyW') {
            tile = tiles.find(c => c.x === empty.x && c.y === empty.y - 1);
            move = TakenMoveType.Down;
        } else if (ev.code === 'ArrowRight' || ev.code === 'KeyD') {
            tile = tiles.find(c => c.x === empty.x - 1 && c.y === empty.y);
            move = TakenMoveType.Right;
        } else if (ev.code === 'ArrowUp' || ev.code === 'KeyS') {
            tile = tiles.find(c => c.x === empty.x && c.y === empty.y + 1);
            move = TakenMoveType.Up;
        } else if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') {
            tile = tiles.find(c => c.x === empty.x + 1 && c.y === empty.y);
            move = TakenMoveType.Left;
        } else if (ev.code === 'KeyR') {
            this.gameReset();
        }

        if (tile && move !== undefined) {
            this.makeMove(tile, move);
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

    private isPuzzleSolved(): boolean {
        return this.state.currentLevel.tiles.filter(c => c.value > 0).every(c => c.value === c.y * this.props.size + c.x + 1);
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

    private makeMove(moveTile: TileModel, moveType: TakenMoveType): void {
        if (this.state.gameState === TakenGameState.Solved) {
            return;
        } else if (this.state.gameState === TakenGameState.NotStarted) {
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

        const emptyTile = this.state.currentLevel.empty;

        switch (moveType) {
            case TakenMoveType.Down:
            case TakenMoveType.Up:
                [moveTile.y, emptyTile.y] = [emptyTile.y, moveTile.y];
                break;
            case TakenMoveType.Right:
            case TakenMoveType.Left:
                [moveTile.x, emptyTile.x] = [emptyTile.x, moveTile.x];
                break;
            default:
                break;
        }

        this.setState({
            totalMoves: this.state.totalMoves + 1,
            currentLevel: {
                ...this.state.currentLevel,
                tiles: this.state.currentLevel.tiles.slice()
            },
            movesHistory: [...this.state.movesHistory, moveType],
        });
    }

    private undoMove(): void {
        if (this.state.gameState === TakenGameState.Solved || this.state.movesHistory.length === 0) {
            return;
        }
        const moveType = this.state.movesHistory.pop();
        let moveTile: TileModel | undefined;

        const {
            empty,
            tiles,
        } = this.state.currentLevel;

        //complete shitshow sorry
        switch (moveType) {
            case TakenMoveType.Down:
                moveTile = tiles.find(c => c.x === empty.x && c.y === empty.y + 1);
                if (!moveTile) { return; }
                [moveTile.y, empty.y] = [empty.y, moveTile.y];
                break;
            case TakenMoveType.Up:
                moveTile = tiles.find(c => c.x === empty.x && c.y === empty.y - 1);
                if (!moveTile) { return; }
                [moveTile.y, empty.y] = [empty.y, moveTile.y];
                break;
            case TakenMoveType.Right:
                moveTile = tiles.find(c => c.x === empty.x - 1 && c.y === empty.y);
                if (!moveTile) { return; }
                [moveTile.x, empty.x] = [empty.x, moveTile.x];
                break;
            case TakenMoveType.Left:
                moveTile = tiles.find(c => c.x === empty.x + 1 && c.y === empty.y);
                if (!moveTile) { return; }
                [moveTile.x, empty.x] = [empty.x, moveTile.x];
                break;
            default:
                break;
        }
        this.setState({
            totalMoves: this.state.totalMoves - 1,
            currentLevel: {
                ...this.state.currentLevel,
                tiles: this.state.currentLevel.tiles.slice()
            },
            movesHistory: [...this.state.movesHistory],
        });
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
                <GameMenu
                    onNewGameClick={() => this.gameReset()}
                    onUndoMoveClick={() => this.undoMove()}
                />
                <Grid
                    level={currentLevel.tiles}
                    onClick={(tile) => this.onTileClick(tile)}
                />
                <GameStats
                    moves={totalMoves}
                    timer={totalSeconds}
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
