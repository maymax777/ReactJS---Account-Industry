import api from 'app/ApiConfig.js'
import FuseUtils from '@fuse/FuseUtils';
import history from 'history.js';
import { Apis } from '../../../config';
import { NotificationManager} from 'react-notifications';

class jwtService extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = async () => {
        api.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err.response !== undefined && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    console.log("Error in setInterceptors");
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Incorrect username or password provided.');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();
        if (!access_token) {
            this.setSession(null);
            this.emit('onAutoLogout', 'You should login.');
        } else if (this.isAuthTokenValid(access_token)) {
            console.log("emit -> auto login");
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'Access_token expired');
        }
    };

    createUser = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            api.post(Apis.UserRegisterApi, data)
                .then(response => {
                    if (!response.data.error) {
                        this.setSession(response.data.token);
                        resolve(response.data);
                    }
                    else {
                        console.log(response);
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = async (email, password) => {
        const data = {
            useremail: email,
            password: password
        }
        try {
            let result = await api.post(Apis.EmailLoginApi, data);
            if (result.data.error) {
                NotificationManager.error(result.data.error);
                return null;
            }
            if (result.data.token) {
                this.setSession(result.data.token);
                return result.data;
            } else {
                return null;
            }
        } catch (error) {
            NotificationManager.error("Can not access to server. Please check your network.")
            console.log(error);
        }

    };

    signInWithToken = async () => {
        try {
            let response = await api.post(Apis.JwtLoginApi);
            this.setSession(response.data.token);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    updateUserData = (user) => {
        return api.post('/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            api.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        } else {
            localStorage.removeItem('jwt_access_token');
            delete api.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        console.log("jwtService -> logout");
        this.setSession(null);

        history.push({
            pathname: '/login'
        });
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
