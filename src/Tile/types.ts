export interface ITile {
    x: number;
    y: number;
    value: number | "x2";
}

export interface ITileProps extends ITile {
    className?: string;
}

export interface ITileNewProps {
    final: ITile;
}
export interface ITileMoveProps {
    from: ITile;
    final: ITile;
    hideAfterMove?: boolean;
}

export interface ITileMergeProps {
    from: ITile;
    to: ITile;
    final: ITile;
}