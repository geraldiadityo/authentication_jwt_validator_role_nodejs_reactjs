import React, {useState, useEffect} from "react";
import UserService from "../service/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then((response) => {
            setContent(response.data.message);
        },
        (error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();
            setContent(_content);
        });
    },[]);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Home;
