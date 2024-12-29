export interface ITile {
    x: number;
    y: number;
    value: number | "x2";
}
export interface IGridTile {
    id: number;
    from: ITile | null;
    to: ITile | null;
    final: ITile;
}

export type TGrid = (null | IGridTile)[][];

export interface IState {
    initiated: boolean;
    grid: TGrid | null;
    score: number;
    bestScore: number;
    changing: boolean;
    step: number;
    isDone: boolean;
}

type Action =
    | {
        type: "init";
        grid: TGrid;
        score: number;
        bestScore: number;
        step: number;
        isDone: boolean;
    }
    | {
        type: "set-grid";
        grid: TGrid;
    }
    | {
        type: "add-score";
        score: number;
    }
    | {
        type: "set-changing";
        changing: boolean;
    }
    | {
        type: "set-is-done";
        isDone: boolean;
    };

export interface IReducer {
    (state: IState, action: Action): IState;
}

export interface IUseGame {
    (): IState & {
        onNewGame: () => void;
        slideTo: (diffX: number, diffY: number) => void;
    };
}

export interface IHeaderProps {
    step: number;
    score: number;
    bestScore: number;
}

export interface INewGameButtonProps {
    onNewGame: () => void;
}