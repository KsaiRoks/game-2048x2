import { useCallback, useEffect, useReducer } from "react";
import { generateGrid, converGrid, randomSetTile, move, removeAnimation, isDone } from "./utils";
import { IGridTile, IReducer, IState, IUseGame, TGrid } from "./types";
import useMount from "../hooks/useMount";

const STORAGE_NAME = "game-state";
const ANIMATION_TIMEOUT = 100;

function updateLocalStorage(
    grid: TGrid,
    score: number,
    bestScore: number,
    step: number
) {
    const storageValue = JSON.stringify({
        grid: converGrid(grid),
        score,
        bestScore,
        step
    });
    localStorage.setItem(STORAGE_NAME, storageValue);
}

const initialState: IState = {
    initiated: false,
    grid: null,
    score: 0,
    bestScore: 0,
    changing: false,
    step: 0,
    isDone: false
};
const reducer: IReducer = (state, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "init":
            newState = {
                initiated: true,
                grid: action.grid,
                score: action.score,
                bestScore:
                    action.score > state.bestScore ? action.score : state.bestScore,
                changing: false,
                step: action.step,
                isDone: action.isDone
            };
            break;

        case "set-grid":
            newState.grid = action.grid;
            break;

        case "add-score":
            const score = state.score + action.score;
            newState.score = score;
            newState.bestScore = score > state.bestScore ? score : state.bestScore;
            break;

        case "set-changing":
            let step = state.step;
            if (action.changing) step++;
            return { ...state, changing: action.changing, step };

        case "set-is-done":
            newState.isDone = action.isDone;
            break;

        default:
            return state;
    }

    if (newState.grid !== null) {
        updateLocalStorage(
            newState.grid,
            newState.score,
            newState.bestScore,
            newState.step
        );
    }
    return newState;
};

const useGame: IUseGame = () => {
    const { isMount } = useMount();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (isMount && !state.initiated) {
            let grid: null | TGrid = null,
                score = 0,
                bestScore = 0,
                step = 0,
                isDone = false;
            const storageValue = localStorage.getItem(STORAGE_NAME);
            if (storageValue) {
                const storageState = JSON.parse(storageValue);
                if (storageState) {
                    if (storageState.grid) grid = generateGrid(storageState.grid);
                    if (storageState.score) score = storageState.score;
                    if (storageState.bestScore) bestScore = storageState.bestScore;
                    if (storageState.step) step = storageState.step;
                    if (storageState.isDone) isDone = storageState.isDone;
                }
            }
            if (grid === null) {
                grid = generateGrid();
                grid = randomSetTile(grid, 2);
            }
            dispatch({ type: "init", grid, score, bestScore, step, isDone });
            localStorage.setItem(STORAGE_NAME, storageValue || "");
        }
    }, [isMount, state.initiated]);

    const onNewGame = useCallback(() => {
        let grid = generateGrid();
        grid = randomSetTile(grid, 2);
        const score = 0,
            bestScore = state.bestScore,
            step = 0,
            isDone = false;
        dispatch({ type: "init", grid, score, bestScore, step, isDone });
    }, [state.bestScore]);

    const afterAnimation = (grid: IGridTile[][]) => {
        setTimeout(() => {
            dispatch({ type: "set-grid", grid: removeAnimation(grid) });
            dispatch({ type: "set-changing", changing: false });
        }, ANIMATION_TIMEOUT);
    };

    const slideTo = useCallback(
        (diffX: number, diffY: number) => {
            if (state.changing || state.isDone || !state.grid) return;
            const dir =
                Math.abs(diffX) > Math.abs(diffY)
                    ? diffX > 0
                        ? "right"
                        : "left"
                    : diffY > 0
                        ? "down"
                        : "up";

            let { score, changed, grid } = move(state.grid, dir);
            if (changed) {
                grid = randomSetTile(grid);
                dispatch({ type: "set-grid", grid });
                dispatch({ type: "add-score", score });
                dispatch({ type: "set-changing", changing: true });
                afterAnimation(grid as IGridTile[][]);
            } else {
                dispatch({ type: "set-is-done", isDone: isDone(state.grid) });
            }
        },
        [state.changing, state.grid, state.isDone]
    );

    return { ...state, onNewGame, slideTo };
};

export default useGame;