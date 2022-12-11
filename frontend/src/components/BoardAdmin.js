import React, {useState, useEffect} from "react";
import UserService from "../service/user.service";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAdminBoard().then((response) => {
            setContent(response.data.message);
        },
        (error) => {
            const _content = (error.response &&
                error.response.data &&
                error.response.data.message) || error.message || error.toString();

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

export default BoardAdmin;