import React from "react";

//Need to align table cells, and style table

export default function RepoList({ repo }) {
  return (
    <table>
      <tr className="table-headings">
        <td>No.</td>
        <th>Repository ID</th>
        <th>Name</th>
        <th>Owner</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
      <tbody>
        {repo.map((r, index) => (
          <tr>
            <td>{index + 1}</td>
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
