import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            students {
              id
              name,
              scores {
                course_name
                }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}