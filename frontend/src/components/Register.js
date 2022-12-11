import React, {useState} from "react";
import { useForm } from "react-hook-form";
import AuthService from "../service/auth.service";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successfull, setSuccessFull] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        
        setMessage("");
        setSuccessFull(false);


        AuthService.register(username,email,password).then((response) => {
            setMessage(response.data.message);
            setSuccessFull(true);
        },
        (error) => {
            const resMessage = (
                error.response &&
                error.respones.data &&
                error.respones.data.message
            ) || error.message || error.toString();
            setMessage(resMessage);
            setSuccessFull(false);
        });
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                <form onSubmit={handleSubmit(handleRegister)}>
                    {!successfull && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" {...register("username",{
                                    required:true,
                                    minLength:3,
                                    maxLength:20
                                })} value={username} onChange={onChangeUsername}/>
                                {errors?.username?.type === "required" && (
                                    <div className="alert alert-danger" role="alert">
                                        this field required
                                    </div>
                                )}
                                {errors?.username?.type === "minLength" && (
                                    <div className="alert alert-danger" role="alert">
                                        username must be min 3 character
                                    </div>
                                )}
                                {errors?.username?.type === "maxLength" && (
                                    <div className="alert alert-danger" role="alert">
                                        username cannot exceed 20 character
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" {...register("email",{
                                    required:true,
                                    pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                })} value={email} onChange={onChangeEmail}/>
                                {errors?.email?.type === "required" && (
                                    <div className="alert alert-danger" role="alert">
                                        this field is required
                                    </div>
                                )}
                                {errors?.email?.type === "pattern" && (
                                    <div className="alert alert-danger" role="alert">
                                        not valid email
                                    </div>
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
                                    <div className="alert alert-danger" role="alert">
                                        this field is required
                                    </div>
                                )}
                                {errors?.password?.type === "minLength" && (
                                    <div className="alert alert-danger" role="alert">
                                        this field must min 6 character
                                    </div>
                                )}
                                {errors?.password?.type === "maxLength" && (
                                    <div className="alert alert-danger" role="alert">
                                        password cannot exceed 30 character
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successfull ? "alert alert-success" : "alert alert-danger" } role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
