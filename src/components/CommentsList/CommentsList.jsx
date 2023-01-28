function CommentsList({ comments = [] }) {
  return (
    <>
      <h3>Comments</h3>
      {comments.map(({ postedBy, text }) => (
        <div className="comment" key={`${postedBy}: ${text}`}>
          <h3>{postedBy}</h3>
          <p>{text}</p>
        </div>
      ))}
    </>
  );
}

export default CommentsList;
