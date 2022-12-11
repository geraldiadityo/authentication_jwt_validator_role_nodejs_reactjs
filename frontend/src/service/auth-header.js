export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accesstoken){
        return {'x-access-token':user.accesstoken};
    }
    else {
        return {};
    }
}
