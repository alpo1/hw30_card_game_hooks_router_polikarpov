import { createContext, useContext, useState } from 'react';

type GameContextType = {
    playerName: string;
    setPlayerName: (name: string) => void;
    gameResult: number[];
    setGameResult: (res: number[]) => void;
    resetGame: () => void;
};

const GameContext = createContext<GameContextType>({
    playerName: '',
    setPlayerName: () => {},
    gameResult: [0, 0],
    setGameResult: () => {},
    resetGame: () => {}
});

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }: { children: any }) => {
    const [playerName, setPlayerName] = useState('');
    const [gameResult, setGameResult] = useState([0, 0]);

    const resetGame = () => {
        setGameResult([0, 0]);
    };

    return (
        <GameContext.Provider value={{
            playerName,
            setPlayerName,
            gameResult,
            setGameResult,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};