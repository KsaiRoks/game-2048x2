import * as React from "react";
import Board from "../Board";
import { Tile, TileMerge, TileMove, TileNew } from "../Tile";
import NewGameButton from "./NewGameButton";
import Header from "./Header";
import DoneCover from "./DoneCover";
import useGame from "./useGame";
import useSlide from "../hooks/useSlide";
import "../Style/Game/game.css";

const Game: React.FC = () => {
    const {
        grid,
        score,
        bestScore,
        step,
        isDone,
        changing,
        onNewGame,
        slideTo
    } = useGame();

    const slideHandlers = useSlide(slideTo, changing);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (changing || isDone) return;

            switch (event.key) {
                case "ArrowUp":
                case "w":
                case "ц":
                    slideTo(0, -1);
                    break;
                case "ArrowDown":
                case "s":
                case "ы":
                    slideTo(0, 1);
                    break;
                case "ArrowLeft":
                case "a":
                case "ф":
                    slideTo(-1, 0);
                    break;
                case "ArrowRight":
                case "d":
                case "в":
                    slideTo(1, 0);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [changing, isDone, slideTo]);

    return (
        <div className="game-root">
            <div>
                <Header step={step} score={score} bestScore={bestScore} />
                <NewGameButton onNewGame={onNewGame} />
                <Board {...slideHandlers}>
                    {grid !== null &&
                        grid.map(row => {
                            return row.map(tile => {
                                if (tile === null) return null;
                                const { id, from, to, final } = tile;
                                const key = `grid-tile-${final.x}-${final.y}-${final.value
                                    }-${id}`;
                                // new
                                if (from === null && to !== null) {
                                    return <TileNew key={key} final={final} />;
                                }
                                // move
                                if (from !== null && to === null) {
                                    return <TileMove key={key} from={from} final={final} />;
                                }
                                // merge
                                if (from !== null && to !== null) {
                                    return (
                                        <TileMerge key={key} from={from} to={to} final={final} />
                                    );
                                }
                                // stay
                                return <Tile key={key} {...final} />;
                            });
                        })}
                    <DoneCover isDone={isDone} />
                </Board>
            </div>
        </div>
    );
};

export default Game;