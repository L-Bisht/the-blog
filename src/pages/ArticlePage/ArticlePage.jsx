import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import NotFoundPage from "../NotFoundPage";

import articles from "../article-content";
import CommentsList from "../../components/CommentsList/CommentsList";
import AddComment from "../../components/AddComment/AddComment";
import useUser from "../../custom-hooks/useUser";

function ArticlePage() {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId = "" } = useParams();
  const article = articles.find(({ name = "" }) => name === articleId);

  const { user, isLoading } = useUser();

  useEffect(() => {
    const fetchArticles = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      setArticleInfo(response.data);
    };
    if (!isLoading) {
      fetchArticles();
    }
  }, [articleId, user, isLoading]);

  const upvoteArticle = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      {
        headers,
      }
    );
    setArticleInfo(response.data);
  };
  if (!article) return <NotFoundPage />;
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={upvoteArticle}>
            {canUpvote ? "Upvote" : "Already upvoted"}
          </button>
        ) : (
          <button>Login to Upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddComment
          articleName={articleId}
          onAddComment={(article) => setArticleInfo(article)}
        />
      ) : (
        <button>Login to Add comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;
