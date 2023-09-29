import { FetchOpinions } from "../Opinion/FetchOpinion";
import url from "../../Url";
import trash from "../../media/delete.svg";

type handleDeleteType = {
  book : {
    id: number,
    title: string,
    author: string
  }
  onDelete : Function
}

export const Book = ({ book, onDelete} : handleDeleteType) => {
  const DeleteBook = async (bookId: number) => {
    try {
      await fetch(url + `api/Book/${bookId}`, {
        method: "DELETE",
      });
      onDelete(bookId)
       
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <div className="bookcard" key={book.id}>
        <div className="bookcard--header">
          <button
            className=" button booktitle--trashbutton"
            type="submit"
            onClick={async () => {
              await DeleteBook(book.id);
            }}
          >
            <img
              className="icone bookcard--iconeTrash"
              src={trash}
              alt="delete"
            />
          </button>
          <h2 className="booktitle">{book.title}</h2>
          <h3 className="bookauthor">by: {book.author}</h3>
        </div>
        <FetchOpinions bookId={book.id} />
      </div>
    </>
  );
};

