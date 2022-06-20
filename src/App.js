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
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        let firstTenRepos = res.data.slice(0, 10);
        setLoading(false);
        setRepo(firstTenRepos); // passes repo object 1 repo = 1 element in array
        //let parsed = parse(res.headers.link);
        //let nextUrl = parsed.next.url;
        //setNextPageUrl(nextUrl);
        let sinceParam = firstTenRepos[firstTenRepos.length - 1].id;
        console.log(sinceParam);
        setNextPageUrl(
          `https://api.github.com/repositories?accept=application/vnd.github.v3+json&since=${sinceParam}`
        );
      });

    return () => cancel();
  }, [currentPageUrl]); //everytime currentPageUrl changes there will be a new API call

  //PAGINATION

  function gotoNextPage() {
    setPageIndex(pageIndex + 1);
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return <Loading />; //add A LOADING COMPONENT

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <Pagination
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
        pageIndex={pageIndex}
      />
      <RepoList repo={repo} />
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
