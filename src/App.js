import React, { useState, useEffect, useRef } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";

var parse = require("parse-link-header");

export default function App() {
  const [repo, setRepo] = useState([]); // array with 10 array elements each with 10 repos
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
  ); //current Page url that is passed in API call
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [pageIndex, setPageIndex] = useState(1); // index of current page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepos = async () => {
      setLoading(true);
      let cancel;

      try {
        const res = await axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        console.log(res);
        console.log(res.data);
        setRepo(res.data);
        const links = parse(res.headers.link);
        const nextLinkURL = links.next.url;
        console.log(nextLinkURL);
        setNextPageUrl(nextLinkURL);

        return () => cancel();
      } catch (error) {
        console.error(error);
      }
    };
    getRepos();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setPageIndex(pageIndex + 1);
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
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
