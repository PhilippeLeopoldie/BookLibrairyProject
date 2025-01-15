

export const numberOfReviewsValidation = (numberOfReview: number | undefined) => {
    if (!numberOfReview) return "";
    if (numberOfReview && numberOfReview === 1) return `${numberOfReview} review`;
    if (numberOfReview && numberOfReview > 1) return `${numberOfReview} reviews`;
}