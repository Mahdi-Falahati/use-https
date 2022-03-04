import { Fragment, useState, useEffect } from "react";
import "./App.css";
import useHttps from "./Components/Hooks/use-https";
import Posts from "./Components/Posts";

function App() {
    const { isLoading, error, secndRequest: fetchRequest } = useHttps();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const applyData = (data) => {
            data.slice(1, 5).map((post) => {
                return setPosts((prevState) => {
                    return [...prevState, post];
                });
            });
        };
        const pushData = (data) => {
            // show result post in console
            console.log(data);
        };
        fetchRequest({ url: " https://jsonplaceholder.typicode.com/posts" }, applyData);

	   // Important: resource will not be really updated on the server
				//   but it will be faked as if.
        fetchRequest(
            {
                url: " https://jsonplaceholder.typicode.com/posts",
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: {
                    title: "foo",
                    body: "bar",
                    userId: 1,
                },
            },
            pushData
        );
    }, [fetchRequest]);

    return (
        <Fragment>
            {isLoading && <h3 className="isLoading">Is loading .... </h3>}
            {error&&<h3 className="error">{error}</h3>}

            <ul>
                {posts.map((p, index) => {
                    return <Posts key={index} title={p.title} body={p.body} />;
                })}
            </ul>
        </Fragment>
    );
}

export default App;
