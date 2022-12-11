import React from "react";
import AuthService from "../service/auth.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Autorities:</strong>
            <ul>
                {currentUser &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Profile;
