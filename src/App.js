import React, { useState, useEffect, useRef } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";

export default function App() {
  const [repo, setRepo] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, prevNextPageUrl] = useState("");

  const pageURL = useRef("");

  //LINK (next): <https://api.github.com/repositories?accept=application%2Fvnd.github.v3+json&since=369>; rel="next",
  //LINK (first): <https://api.github.com/repositories{?since}>; rel="first"

  useEffect(() => {
    axios.get(currentPageUrl).then((res) => {
      setRepo(res.data); // passes repo object 1 repo = 1 element in array
    });
  }, [currentPageUrl]);

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <RepoList repo={repo} />
    </>
  );
}
