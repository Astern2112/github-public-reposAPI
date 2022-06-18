import React from "react";

export default function RepoList({ repo }) {
  return (
    <div>
      <table>
        <th>
          <tr>
            <td>Repo Name</td>
          </tr>
        </th>
        {repo.map((r) => (
          <tr>
            <td key={r}>{r}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
