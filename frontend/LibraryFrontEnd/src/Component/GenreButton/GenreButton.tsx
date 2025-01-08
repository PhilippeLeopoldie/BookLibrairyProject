import { useState } from "react";
import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    name: string,
    handleGenres: (genre: string) => void,
    typeOfChoice: string,
}



export const GenreButton = ({ name, handleGenres, typeOfChoice }: GenreButtonType) => {   
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleOneChoice = () => {
        handleGenres(name);
    }

    const handleMultiChoice = () => {
        setIsClicked(!isClicked);
        handleGenres(name);
    }
    const sessionStorageGenre = sessionStorage.getItem("userGenrePreference");
    const sessionStorageGenres = sessionStorage.getItem("userGenresPreference");

    let displayedContent: JSX.Element = <></>;
    if (typeOfChoice === 'oneChoice') {
        displayedContent = (< button
            className={`${sessionStorageGenre === name ? 'Button--clicked' : 'Button--unclicked'}`}
            onClick={handleOneChoice}>
            {name}
        </button>)
    }
    if (typeOfChoice === 'multiChoices') {
        displayedContent = (< button
            className={`${sessionStorageGenres?.includes(name) ? 'Button--clicked' : 'Button--unclicked'
    }`}
            onClick={handleMultiChoice}>
            {name}
        </button>)
    }

    return (
        <>
            {displayedContent}
        </>
    )
};