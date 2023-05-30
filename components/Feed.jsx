"use client";
import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // SEARCH
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPosts(e.target.value);
        setAllPosts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filteredPosts(tag);
    setAllPosts(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const filteredPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
