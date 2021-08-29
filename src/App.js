import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import LoggedIn from './components/LoggedIn';
import JobsGrid from './components/JobsGrid';

import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import {
    EuiPageTemplate,
    EuiCard,
    EuiFlexItem,
    EuiFlexGroup,
} from '@elastic/eui';

import jobService from './services/jobs';
import loginService from './services/login';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({});

    useEffect(() => {
        jobService.getAll().then((initialJobs) => {
            setJobs(initialJobs);
            console.log(initialJobs);
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(
            'loggedFinanceAppUser'
        );

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            jobService.setToken(user.token);
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
            <EuiCard className="component-background">
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
            </EuiCard>
        );
    };

    const jobsPage = () => {
        return (
            <div>
                <LoggedIn user={user} handleLogout={handleLogout} />
                <JobsGrid jobs={jobs} />
            </div>
        );
    };

    return (
        <EuiPageTemplate
            template="centeredBody"
            className="page-background"
            pageContentProps={{
                paddingSize: 'none',
                color: 'transparent',
            }}
        >
            {user === null ? loginForm() : jobsPage()}
        </EuiPageTemplate>
    );
};

export default App;
