import React, { useContext } from "react";
import { RepoContext } from "../App";

//Need to align table cells, and style table

export default function RepoList() {
  let { repo, pageIndex } = useContext(RepoContext);
  return (
    <table className="table-content">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Owner</th>
          {/* <th>Type</th> */}
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {repo[pageIndex - 1] &&
          repo[pageIndex - 1].map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-name"
                >
                  {" "}
                  {r.name}{" "}
                </a>
                <div className="hide">
                  <p>
                    <span className="bold">Full Name: </span>
                    {r.full_name}
                  </p>
                  <p>
                    <span className="bold"> Node id: </span>
                    {r.node_id}
                  </p>
                </div>
              </td>
              <td>
                <div className="owner-content">
                  <a href={r.owner.html_url} target="_blank" rel="noreferrer">
                    <img src={r.owner.avatar_url} alt="Onwer Avatar" />{" "}
                  </a>
                  <a
                    href={r.owner.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="owner-name"
                  >
                    {r.owner.login}
                  </a>
                </div>
              </td>
              {/* <td>{r.owner.type} </td> */}
              <td>{r.description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
