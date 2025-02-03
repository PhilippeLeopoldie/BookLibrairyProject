import "../GenreButton/GenreButton.css";

type GenreButtonType = {
    genre: genreType,
    handleGenres: (genre: string) => void,
    typeOfChoice: 'single' | 'multiple',
    sessionStorageName: string
}

type genreType = {
    id: number,
    name: string
}



export const GenreButton = ({ genre, handleGenres, typeOfChoice, sessionStorageName }: GenreButtonType) => {   

    const handleChoice = () => {
        handleGenres(genre.id.toString());
    }

    const buttonClassName  = (): string => {
        if (typeOfChoice === 'single') {
            return sessionStorageGenre?.at(0) === genre.id.toString()
                ? 'genreButton Button--clicked'
                : 'genreButton Button--unclicked'; 
        };
        return sessionStorageGenre?.includes(genre.id.toString())
            ? 'genreButton Button--clicked'
            : 'genreButton Button--unclicked';
    }

    const sessionStorageGenre = sessionStorage.getItem(sessionStorageName)?.split(",");

    return (
        <>
            <button
                className={buttonClassName()}
                onClick={handleChoice}>
                {genre.name}
            </button>
        </>
    )
};