import * as React from "react";

export interface IMouseEventHandler {
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export interface ITouchEventHandler {
    (event: React.TouchEvent<HTMLDivElement>): void;
}

export interface IBoardProps {
    onMouseDown?: IMouseEventHandler | undefined;
    onMouseUp?: IMouseEventHandler | undefined;
    onMouseLeave?: IMouseEventHandler | undefined;
    onTouchStart?: ITouchEventHandler | undefined;
    onTouchEnd?: ITouchEventHandler | undefined;
    children: React.ReactNode;
}