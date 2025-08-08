import React, { useState } from "react";
import Navbar from "../component/Navbar";

export default function Home() {
  // Demo blog post
  const blog = {
    id: 1,
    title: "My First Blog Post",
    content:
      "This is some demo content for the blog post. Later we will fetch this from backend. It's styled beautifully with TailwindCSS so it looks modern.",
    author: "John Doe",
    createdAt: "2025-08-08",
  };

  // Demo comments
  const [comments, setComments] = useState([
    { id: 1, text: "Nice post!", author: "Alice" },
    { id: 2, text: "I learned something new today.", author: "Bob" },
  ]);

  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newComment,
      author: "Guest User",
    };
    setComments([...comments, newEntry]);
    setNewComment("");
  };

  // Delete comment
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // Start edit mode
  const handleEditComment = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  // Save edited comment
  const handleSaveEdit = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editId ? { ...comment, text: editText } : comment
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Blog Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
          <p className="text-gray-700 mb-6">{blog.content}</p>
          <div className="text-sm text-gray-500">
            By <span className="font-medium">{blog.author}</span> | {blog.createdAt}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Comments ({comments.length})
          </h3>

          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 p-4 rounded-xl mb-3 shadow-sm"
            >
              {editId === comment.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-800">{comment.text}</p>
                  <small className="text-gray-500">- {comment.author}</small>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment.id, comment.text)}
                      className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add Comment */}
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddComment}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
