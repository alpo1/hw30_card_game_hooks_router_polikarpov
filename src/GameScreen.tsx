import { useState, useEffect } from 'react';
import { CardInfo } from "./cardInfo.ts";
import info from "./utils/cards_info.json";
import { useNavigate } from "react-router-dom";
import { useGame } from "./GameContext";

const GameScreen = () => {
    const { playerName, setGameResult } = useGame();
    const navigate = useNavigate();

    const [compCards, setCompCards] = useState<CardInfo[]>([]);
    const [yourCards, setYourCards] = useState<CardInfo[]>([]);
    const [currCompCard, setCurrCompCard] = useState<CardInfo | null>(null);
    const [currYourCard, setCurrYourCard] = useState<CardInfo | null>(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [wonCompCards, setWonCompCards] = useState<CardInfo[]>([]);
    const [wonYourCards, setWonYourCards] = useState<CardInfo[]>([]);
    const [battlePile, setBattlePile] = useState<CardInfo[]>([]);
    const [deck, setDeck] = useState<CardInfo[]>([]);

    useEffect(() => {
        const initialDeck = info.cards.map(card => ({
            suit: card.suit,
            rank: card.rank,
            image: card.img,
        }));
        setDeck(shuffleDeck([...initialDeck]));
    }, []);

    const shuffleDeck = (deck: CardInfo[]) => {
        return [...deck].sort(() => Math.random() - 0.5);
    };

    const rankValue = (rank: string) => {
        switch (rank) {
            case 'J': return 11;
            case 'Q': return 12;
            case 'K': return 13;
            case 'A': return 14;
            default: return parseInt(rank, 10);
        }
    };

    const startGame = () => {
        const half = Math.floor(deck.length / 2);
        const compCards = deck.slice(0, half);
        const yourCards = deck.slice(half);

        setCompCards(compCards);
        setYourCards(yourCards);
        setCurrCompCard(compCards[0]);
        setCurrYourCard(yourCards[0]);
        setIsGameStarted(true);
        setWonCompCards([]);
        setWonYourCards([]);
        setBattlePile([]);
    };

    const endGame = (finalResult: number[]) => {
        setGameResult(finalResult);
        navigate('/result');
    };

    const decide = (wonCardsComp: CardInfo[], wonCardsYour: CardInfo[]) => {
        const compScore = wonCardsComp.length;
        const yourScore = wonCardsYour.length;
        setGameResult([compScore, yourScore]);
    };

    const openCards = () => {
        let newCompCards = [...compCards];
        let newYourCards = [...yourCards];
        let newWonCompCards = [...wonCompCards];
        let newWonYourCards = [...wonYourCards];
        let newBattlePile = [...battlePile];

        if (!newCompCards.length || !newYourCards.length) {
            endGame([newWonCompCards.length, newWonYourCards.length]);
            return;
        }

        while (true) {
            if (!newCompCards.length || !newYourCards.length) {
                endGame([newWonCompCards.length, newWonYourCards.length]);
                return;
            }

            const currCompCard = newCompCards[0];
            const currYourCard = newYourCards[0];

            const compCardVal = rankValue(currCompCard.rank);
            const yourCardVal = rankValue(currYourCard.rank);

            newBattlePile.push(currYourCard, currCompCard);
            newCompCards = newCompCards.slice(1);
            newYourCards = newYourCards.slice(1);

            if (compCardVal > yourCardVal) {
                newWonCompCards.push(...newBattlePile);
                newBattlePile = [];
                break;
            } else if (compCardVal < yourCardVal) {
                newWonYourCards.push(...newBattlePile);
                newBattlePile = [];
                break;
            } else {
                if (newCompCards.length > 0 && newYourCards.length > 0) {
                    newBattlePile.push(newCompCards[0], newYourCards[0]);
                    newCompCards = newCompCards.slice(1);
                    newYourCards = newYourCards.slice(1);
                } else {
                    decide(newWonCompCards, newWonYourCards);
                    endGame([newWonCompCards.length, newWonYourCards.length]);
                    return;
                }
            }
        }

        setCompCards(newCompCards);
        setYourCards(newYourCards);
        setCurrCompCard(newCompCards[0] || null);
        setCurrYourCard(newYourCards[0] || null);
        setWonCompCards(newWonCompCards);
        setWonYourCards(newWonYourCards);
        setBattlePile(newBattlePile);

        if (!newCompCards.length || !newYourCards.length) {
            endGame([newWonCompCards.length, newWonYourCards.length]);
        }
    };

    const handleButtonClick = () => {
        if (!isGameStarted) {
            startGame();
        } else {
            openCards();
        }
    };

    if (!isGameStarted) {
        return (
            <div>
                <img src="/src/images/cardBackSide.jpg" alt="back" style={{ height: "300px" }} />
                <p>Computer cards</p>
                <p>{playerName} cards</p>
                <img src="/src/images/cardBackSide.jpg" alt="back" style={{ height: "300px" }} />
                <br />
                <button onClick={handleButtonClick}>Начать игру</button>
            </div>
        );
    }

    return (
        <div>
            <img
                src={currCompCard?.image || "/src/images/cardBackSide.jpg"}
                alt="back"
                style={{ height: "300px" }}
            />
            <p>Computer: {wonCompCards.length} (left: {compCards.length})</p>
            <p>{playerName}: {wonYourCards.length} (left: {yourCards.length})</p>
            <img
                src={currYourCard?.image || "/src/images/cardBackSide.jpg"}
                alt="back"
                style={{ height: "300px" }}
            />
            <br />
            <button onClick={handleButtonClick}>Открыть карты</button>

            {battlePile.length > 0 && (
                <div>
                    <h3>Карты на столе:</h3>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {battlePile.map((card, index) => (
                            <img
                                key={index}
                                src={card.image}
                                alt="card"
                                style={{ height: "100px" }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameScreen;