import axios from "axios";
import authHeader from "./auth-header";
class AuthService {
        login(email, password) {
            return axios
            .post("https://pint2021.herokuapp.com/Pessoas/login", {Email:email, Password:password},{headers:{authorization:'chavesecreta'}})
            .then(res => {
                if(res.status !== 500){
                        if (res.data.token) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                    return res.data;
                }
            }, reason => {return reason.response;});
        }
        logout() { localStorage.removeItem("user"); }
        getCurrentUser() { return JSON.parse(localStorage.getItem('user'));}
} export default new AuthService();
