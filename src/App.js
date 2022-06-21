import React, { useState, useEffect, createContext } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";
export const RepoContext = createContext();
var parse = require("parse-link-header");

export default function App() {
  const [repo, setRepo] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let splitRepo = repo;
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

  function gotoNextPage() {
    setPageIndex(pageIndex + 1);
    if (repo[pageIndex] === undefined) {
      setCurrentPageUrl(nextPageUrl);
    }
    window.scrollTo(0, 0);
  }
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
    window.scrollTo(0, 0);
  }

  if (loading) return <Loading />; //add A LOADING COMPONENT

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <RepoContext.Provider value={{ repo, pageIndex }}>
        <RepoList />
      </RepoContext.Provider>
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        pageIndex={pageIndex}
      />
    </>
  );
}
