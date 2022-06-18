import React from "react";

export default function RepoList({ repo }) {
  return (
    <table border={1}>
      <th border={1}>
        <tr>
          <td>Repository ID</td>
          <td>Node_ID</td>
        </tr>
      </th>
      <tbody>
        {repo.map((r) => (
          <tr>
            <td>{r.id}</td>
            <td>{r.node_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
