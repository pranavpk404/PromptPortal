"use client";

import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  //SEARCH
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null); //to prevent too many requests

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); //clear previous timeout
    setSearchText(e.target.value);

    //debounce search
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
