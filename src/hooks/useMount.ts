import { useEffect, useState } from "react";

const useMount = () => {
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        setIsMount(true);
        return () => {
            setIsMount(false);
        };
    }, []);

    return { isMount };
};

export default useMount;