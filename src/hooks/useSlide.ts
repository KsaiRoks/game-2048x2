import { useReducer } from "react";
import { IState, TAction } from "./types";

const initialState: IState = {
    isDown: false,
    x: null,
    y: null
};

const reducer = (state: IState, action: TAction) => {
    switch (action.type) {
        case "reset":
            return initialState;

        case "set-is-down":
            return {
                ...state,
                isDown: true,
                x: action.x,
                y: action.y
            };

        default:
            return state;
    }
};

interface MouseEventHandler {
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface TouchEventHandler {
    (event: React.TouchEvent<HTMLDivElement>): void;
}

interface UseSlide {
    (callback?: (diffX: number, diffY: number) => void, halt?: boolean): {
        onMouseDown: undefined | MouseEventHandler;
        onMouseUp: undefined | MouseEventHandler;
        onMouseLeave: undefined | MouseEventHandler;
        onTouchStart: undefined | TouchEventHandler;
        onTouchEnd: undefined | TouchEventHandler;
    };
}
const useSlide: UseSlide = (callback, halt = false) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onMouseStart: MouseEventHandler = event => {
        event.preventDefault();
        dispatch({ type: "set-is-down", x: event.screenX, y: event.screenY });
    };

    const onMouseEnd: MouseEventHandler = event => {
        event.preventDefault();
        if (state.isDown && state.x !== null && state.y !== null && callback) {
            const diffX = event.screenX - state.x,
                diffY = event.screenY - state.y;
            dispatch({ type: "reset" });
            callback(diffX, diffY);
        }
    };

    const onTouchStart: TouchEventHandler = event => {
        event.preventDefault();
        const touch = event.touches[0];
        if (touch) {
            dispatch({ type: "set-is-down", x: touch.screenX, y: touch.screenY });
        }
    };

    const onTouchEnd: TouchEventHandler = event => {
        event.preventDefault();
        if (state.isDown && state.x !== null && state.y !== null && callback) {
            const touch = event.changedTouches[0];
            if (touch) {
                const diffX = touch.screenX - state.x,
                    diffY = touch.screenY - state.y;
                callback(diffX, diffY);
            }
            dispatch({ type: "reset" });
        }
    };

    return {
        onMouseDown: halt ? undefined : onMouseStart,
        onMouseUp: halt ? undefined : onMouseEnd,
        onMouseLeave: halt ? undefined : onMouseEnd,
        onTouchStart: halt ? undefined : onTouchStart,
        onTouchEnd: halt ? undefined : onTouchEnd
    };
};

export default useSlide;
