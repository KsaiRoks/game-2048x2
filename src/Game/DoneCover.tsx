import * as React from "react";
import "../Style/Game/doneCover.css";

const DoneCover: React.FC<{ isDone: boolean }> = ({ isDone }) => {
    if (!isDone) return null;

    return (
        <div className="done-cover">
            <h4>Ты проиграл :\</h4>
        </div>
    );
};

export default DoneCover;