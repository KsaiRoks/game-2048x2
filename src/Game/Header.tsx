import * as React from "react";
import { IHeaderProps } from "./types";
import "../Style/Game/header.css"

const Header: React.FC<IHeaderProps> = ({ step, score, bestScore }) => {
    const Block = React.memo(
        ({ title, value }: { title: string; value: number }) => {
            return (
                <div className="block">
                    <span>{title}</span>
                    <h6>{value}</h6>
                </div>
            );
        }
    );

    return (
        <div className="header-root">
            <div className="header-title">
            </div>
            <div className="header-blocks">
                <Block title="Шаги" value={step} />
                <Block title="Очки" value={score} />
                <Block title="Рекорд" value={bestScore} />
            </div>
        </div>
    );
};

export default React.memo(Header);