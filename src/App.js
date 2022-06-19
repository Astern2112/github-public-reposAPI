import React, { useState, useEffect } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";

export default function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
      )
      .then((res) => {
        setRepo(res.data); // passes repo object 1 repo = 1 element in array
      });
  }, []);

  return (
    <>
      <h1 className="page-heading">Github Public Repositories</h1>
      <RepoList repo={repo} />
      {console.log(repo.length)}
    </>
  );
}
