import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import { EuiPage, EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import loginService from './services/login';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(
            'loggedFinanceAppUser'
        );

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            //ENTER job service token set here later
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });
            console.log(user);
            window.localStorage.setItem(
                'loggedFinanceAppUser',
                JSON.stringify(user)
            );

            //ENTER job service token set here later
            setUser(user);
            setUsername('');
            setPassword('');
        } catch {
            setMessage('Wrong Credentials');
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();

        window.localStorage.removeItem('loggedFinanceAppUser');
        setUser(null);
    };

    const loginForm = () => {
        return (
            <EuiPage style={{ height: '100vh' }}>
                <EuiFlexGroup
                    justifyContent="spaceAround"
                    alignItems="center"
                >
                    <EuiFlexItem grow={false}>
                        <EuiText>
                            <LoginForm
                                message={message}
                                username={username}
                                password={password}
                                handleUsernameChange={({ target }) =>
                                    setUsername(target.value)
                                }
                                handlePasswordChange={({ target }) => {
                                    setPassword(target.value);
                                }}
                                handleSubmit={handleLogin}
                                setMessage={setMessage}
                            />
                        </EuiText>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiPage>
        );
    };

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} is logged in</p>
                    <button onClick={handleLogout}>log out</button>
                </div>
            )}
        </div>
    );
};

export default App;
