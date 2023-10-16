import React, { useState } from "react";
import url from "../../Url";
import { RateClick } from "../OpinionEdit/RateClick/RateClick";
import "./OpinionCreate.css";

type AddOpinionType = {
  book?: {
    id: number,
    title: string,
    author: string,
  };
  toCreate: () => void;
};

type FormDataType = {
  view: string,
  userName: string,
  rate: number,
};

export const OpinionCreate = ({ book, toCreate }: AddOpinionType) => {
  const [bookCreatedMessage, setBookCreatedMessage] = useState<boolean>(false);
  const [errorOpinion, setErrorOpinion] = useState<boolean>(false);
  const [errorOpinionDetail, setErrorOpinionDetail] = useState<string>("");

  const [formData, setFormData] = useState<FormDataType>({
    view: "",
    userName: "",
    rate: 0,
  });

  const HandleFormDataRate = (newRate: number) => {
    setFormData({ ...formData, rate: newRate });
  };

  const PostOpinion = async (bookId: number) => {
    console.log("bookid", bookId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        rate: formData.rate,
        view: formData.view,
        userName: formData.userName,
      }),
    };
    const opinionResponse: Response = await fetch(
      url + "api/Opinion",
      requestOptions
    );
    if (opinionResponse.status === 201) {
      const newOpinion = await opinionResponse.json();
      setBookCreatedMessage(true);
      setErrorOpinion(false);
      toCreate();
      return newOpinion;
    } else if (opinionResponse.status === 400) {
      const errorData = await opinionResponse.json();
      setBookCreatedMessage(false);
      setErrorOpinion(true);
      setErrorOpinionDetail(errorData.detail);
    }
  };

  const HideBookCreatedMessage = () => {
    setBookCreatedMessage(false);
  };
  const HideErrorDetail = () => {
    setErrorOpinion(false);
  };
  const HandleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    bookCreatedMessage && HideBookCreatedMessage();
    errorOpinion && HideErrorDetail();
  };

  return (
    <>
      <div className="opinionCreateCard">
        <h2 className="booktitle">{book?.title}</h2>
        <h3 className="bookauthor">by: {book?.author}</h3>
        <RateClick rate={formData.rate} HandleRate={HandleFormDataRate} />
        <textarea
          className="opinionForm__view input"
          placeholder="View"
          name="view"
          value={formData.view}
          onChange={(e) => HandleInputChange(e)}
        />

        <input
          className="input"
          placeholder="UserName"
          name="userName"
          value={formData.userName}
          onChange={(e) => HandleInputChange(e)}
        />
        <div className="opinionForm__footer">
          <button
            className="button bookForm__postButton"
            onClick={async () => {
              book && book.id && (await PostOpinion(book.id));
            }}
          >
            Post
          </button>
          <button
            onClick={() => {
              toCreate();
            }}
          >
            Cancel
          </button>
        </div>

        {errorOpinion && (
          <div className="validation__errorMessage">{errorOpinionDetail}</div>
        )}
        {bookCreatedMessage && (
          <h1 className="bookform__output">Review posted!</h1>
        )}
      </div>
    </>
  );
};

export default OpinionCreate;
