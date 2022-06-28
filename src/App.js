import React, { useState, useEffect, createContext, useRef } from "react";
import RepoList from "./components/RepoList";
import axios from "axios";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";

/* A package that parses the link header from the github api response. */
var parse = require("parse-link-header");

/* Creating a context that can be used to pass data to child components. */
export const PageContext = createContext();
export const RepoContext = createContext();

export default function App() {
  /*
  This will be a jagged array, the main array will contain array elements. each array element will have 10 elements which are Repositiory objects, 
  The array will start off empty, each api call will add 10 array elements to the array. This is becuase each response contains an array of 
  size 100 with each element being a repository object. Becuase we only want to show 10 repositioes per page, we will have to split the response 
  array into sub arrays of 10 elements. 100/10 = 10. Each element in the main array will represent a single page, and the objects in the sub array 
  will represent a repository. 
  */
  const [repo, setRepo] = useState([]);
  // url of current endpoint
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://api.github.com/repositories?accept=application/vnd.github.v3+json"
  );
  // Not next page but the next Url of the endpoint for the next set of 100 repos
  const [nextPageUrl, setNextPageUrl] = useState("");
  // state to track the idex of the current page, is passed to child components for conditionals.
  const [pageIndex, setPageIndex] = useState(1);
  // loading state to check if data is currently being fetched.
  const [loading, setLoading] = useState(true);
  // used to track the input from the user. tried using state but did not work.
  const pageInput = useRef(null);

  /**
   * When the page first loads used effect will be triggered. use effect will always trigger when the currentPageUrl, pageIndex,
   * and repo (the jagged array of repositories) is changed. The currentPageUrl updates when you press the nextpage button and the index of the page
   * that you want does not exist in the array. The pageIndex is updated every time you press the next/prev page buttons, goToPage. The repo Jagged array
   * is only updated when you make a call to the endpoint. The axios function only executes when if index of the page you are trying to get does not exist
   * in the current array of pages.
   *
   *
   */
  useEffect(() => {
    async function getData() {
      setLoading(true); // sets loading state to true
      let splitRepo = [...repo]; // obtain the curent array of pages
      while (splitRepo[pageIndex - 1] === undefined) {
        // checks if the page does not exist, if it doesnt exist then it makes the request for the next set
        const response = await axios.get(currentPageUrl); // make a request to the current pageUrl, the currentPageUrl was updated in another function so it is not the same ans the previous one
        const parsedLink = parse(response.headers.link); // converts the link header to an object
        splitRepo = splitRepo.concat(splitReposIntoArray(response.data)); // updates the array of pages to add another 10 array elements of 10 repo objects
        setRepo(splitRepo); // updates the array of Pages state
        setNextPageUrl(parsedLink.next.url); // updates the enpoint for the next set of 100 repositories
      }
      setLoading(false); // request finished and loading is done
    }
    getData(); // calls the function
  }, [currentPageUrl, pageIndex, repo]);

  /**
   *
   * @param {*} resp array of 100 elements, eaching element is a repositioy object
   * @returns
   */
  function splitReposIntoArray(resp) {
    const arr = [];
    let currentRepos = [];
    // loops through 10 times so there are 10 arrays,
    for (let i = 0; i < 10; i++) {
      currentRepos = resp.splice(0, 10); // one array of 10 repositories
      arr.push(currentRepos); // adds the array of 1 page to a parent array
    }

    return arr;
  }

  /**
   * Sets the screen position to the top of the page
   */
  const smoothScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  /**
   * Changes pageIndex state to the current page+1,
   * checks if the page that you are trying to go to
   * exists in the current array, if no then the
   * current page url state is updated to the enpoint
   * for the next set of 100 repositories then
   * the useEffect hook is triggered becuase the state changed
   */
  function gotoNextPage() {
    setPageIndex(pageIndex + 1);
    if (repo[pageIndex] === undefined) {
      setCurrentPageUrl(nextPageUrl);
    }
    smoothScrollToTop();
  }
  /**
   * changes the page index to the one less than the current.
   * we know the page already exists in the current array so
   * no need to check if it exists.
   */
  function gotoPrevPage() {
    setPageIndex(pageIndex - 1);
    smoothScrollToTop();
  }
  /**
   * retrieves the value that is inputed by the user, parses it
   * into an integer. if the value inputed is not a number the
   * the url for the current set of repositories and current page
   * will not change. if it is a number the we will set the ape index
   * to the next page that is inputed, check if that page exists in the
   * current array, if not then the url for the current page will
   * update and the useEffect hook will be triggered.
   */
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

  if (loading) return <Loading />; // if the request is still being made then the loading component will be rendered.

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
