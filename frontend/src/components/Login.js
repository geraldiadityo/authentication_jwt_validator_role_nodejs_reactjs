import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../service/auth.service";


const Login = () => {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        console.log(e);
        console.log(username);
        console.log(password);

        setMessage("");
        setloading(true);


        AuthService.login(username, password).then(() => {
            navigate("/profile");
            window.location.reload();
        },
        (error) => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) || error.message || error.toString();
            setloading(false);
            setMessage(resMessage);
        });
        
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" {...register("username",{
                            required:true,
                            minLength:3,
                            maxLength:20
                        })} onChange={onChangeUsername}/>
                        {errors?.username?.type==="required" && (
                            <p>This field is required</p>
                        )}
                        {errors?.username?.type === "minLength" && (
                            <p>min username exceed 3 character</p>
                        )}
                        {errors?.username?.type === "maxLength" && (
                            <p>username cannot exceed 20 character</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" {...register("password",{
                            required:true,
                            minLength:6,
                            maxLength:30
                        })} value={password} onChange={onChangePassword}/>
                        {errors?.password?.type === "required" && (
                            <p>this field is required</p>
                        )}
                        {errors?.password?.type === "minLength" && (
                            <p>password have to min 6 character</p>
                        )}
                        {errors?.password?.type === "maxLength" && (
                            <p>password cannot exceed 30 character</p>
                        )}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
