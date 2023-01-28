import axios from "axios";
import { useState } from "react";
import useUser from "../../custom-hooks/useUser";

function AddComment({ articleName, onAddComment }) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addNewComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comment`,
      {
        postedBy: name,
        text: commentText,
      },
      { headers }
    );
    onAddComment(response.data);
    setName("");
    setCommentText("");
  };
  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      {user && <p>You're posting as {user.email}</p>}
      <textarea
        row="4"
        col="50"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={addNewComment}>Add comment</button>
    </div>
  );
}

export default AddComment;
