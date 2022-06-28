import React, { useContext } from "react";
import { RepoContext } from "../App";

export default function RepoList() {
  let { repo, pageIndex } = useContext(RepoContext);
  return (
    <table className="table-content">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Owner</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {repo[pageIndex - 1] && // checks weather the index of the pageRequested exists, if it does then it will render the table content
          repo[pageIndex - 1].map((r) => (
            // mapps over each element in the array at the index of the requested page.
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
                    <img
                      src={r.owner.avatar_url}
                      alt="Onwer Avatar"
                      loading="lazy"
                    />{" "}
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
              <td>{r.description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
