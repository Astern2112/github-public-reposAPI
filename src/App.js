import React, { useState, useEffect, useRef } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";

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
  }, [currentPageUrl]);

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
  }
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
  }

  if (loading) return <Loading />; //add A LOADING COMPONENT

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <RepoList repo={repo} pageIndex={pageIndex} />
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        pageIndex={pageIndex}
      />
    </>
  );
}

//try and extract the first 10 elemetns in the repo Array that is pased line 50
// get the id of the last repo element in the array
// can set the since parameter to the last element's id
