"use client";
import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      // if (response.status === 200) {
      //   const data = await response.json();
      //   setAllPosts(data);
      //   setIsLoading(false);
      // } else {
      //   alert("failed fetching");
      // }
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
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <section className="mx-auto mt-16 flex w-full max-w-xl flex-col items-center justify-center gap-2 ">
      <form className="flex-center relative w-full ">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="peer block w-full rounded-md border bg-white py-2.5 pl-5 pr-12 font-satoshi text-sm font-medium shadow-lg focus:border-black focus:outline-none focus:ring-0  dark:border-slate-700 dark:bg-gray-950 "
        />
      </form>

      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
