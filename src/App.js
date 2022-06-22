import React, { useState, useEffect, createContext, useRef } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";

var parse = require("parse-link-header");

export const PageContext = createContext();
export const RepoContext = createContext();

export default function App() {
  const [repo, setRepo] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageInput = useRef(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let splitRepo = [...repo];
      while (splitRepo[pageIndex - 1] === undefined) {
        const response = await axios.get(currentPageUrl);
        const parsedLink = parse(response.headers.link);
        splitRepo = splitRepo.concat(splitReposIntoArray(response.data));
        setRepo(splitRepo);
        setNextPageUrl(parsedLink.next.url);
      }
      setLoading(false);
    }
    getData();
  }, [currentPageUrl, pageIndex, repo]);

  function splitReposIntoArray(resp) {
    const arr = [];
    let currentRepos = [];
    for (let i = 0; i < 10; i++) {
      currentRepos = resp.splice(0, 10);
      arr.push(currentRepos);
    }
    currentRepos = [];
    return arr;
  }

  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  function gotoNextPage() {
    setPageIndex(pageIndex + 1);
    if (repo[pageIndex] === undefined) {
      setCurrentPageUrl(nextPageUrl);
    }
    smoothScrollToTop();
  }
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
    smoothScrollToTop();
  }

  async function gotoPage() {
    const page = parseInt(pageInput.current.value);
    if (isNaN(page)) {
      setCurrentPageUrl(currentPageUrl);
      setPageIndex(pageIndex);
    } else {
      setPageIndex(page);
      if (repo[page - 1] === undefined) {
        setCurrentPageUrl(nextPageUrl);
      }
    }

    smoothScrollToTop();
  }

  if (loading) return <Loading />; //add A LOADING COMPONENT

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <RepoContext.Provider value={{ repo, pageIndex }}>
        <RepoList />
      </RepoContext.Provider>
      <PageContext.Provider
        value={{ gotoNextPage, gotoPrevPage, pageIndex, gotoPage, pageInput }}
      >
        <Pagination />
      </PageContext.Provider>
    </>
  );
}
