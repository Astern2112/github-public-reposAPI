import React, { useState, useEffect } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";

export default function App() {
  const [repo, setRepo] = useState([]);
  useEffect(() => {
    axios.get("https://api.github.com/repositories").then((res) => {
      setRepo(res.data);
    });
  }, []);

  return <RepoList repo={repo} />;
}
