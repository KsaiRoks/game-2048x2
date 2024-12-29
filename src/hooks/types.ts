export interface IState {
    isDown: boolean;
    x: number | null;
    y: number | null;
}

export type TAction =
    | {
        type: "reset";
    }
    | {
        type: "set-is-down";
        x: number;
        y: number;
    };