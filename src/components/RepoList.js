import React, { useContext } from "react";
import { RepoContext } from "../App";

//Need to align table cells, and style table

export default function RepoList() {
  let { repo, pageIndex } = useContext(RepoContext);
  return (
    <table>
      <thead>
        <tr className="table-headings">
          <th>Repository ID</th>
          <th>Name</th>
          <th>Owner</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {repo[pageIndex - 1] &&
          repo[pageIndex - 1].map((r) => (
            <tr>
              <td>{r.id}</td>
              <td>
                {" "}
                <a href={r.html_url}> {r.name} </a>
              </td>
              <td>
                <img
                  src={r.owner.avatar_url}
                  alt="Onwer Avatar"
                  width={30}
                  height={30}
                />{" "}
                <a href={r.owner.html_url}>
                  {" "}
                  {r.name}
                  {r.owner.login}
                </a>
              </td>
              <td>{r.owner.type} </td>
              <td>{r.description}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
