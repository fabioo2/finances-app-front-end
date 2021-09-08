import React, { useState, useEffect } from 'react';

import LoginForm from './components/LoginForm';
import LoggedIn from './components/LoggedIn';
import JobsGrid from './components/JobsGrid';
import CreateJob from './components/CreateJob';

import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import { EuiPageTemplate, EuiCard, EuiPanel } from '@elastic/eui';

import jobService from './services/jobs';
import loginService from './services/login';

import moment from 'moment';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        client: '',
        amount: '',
        paid: true,
        date: moment(),
    });
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

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

            window.localStorage.setItem(
                'loggedFinanceAppUser',
                JSON.stringify(user)
            );

            jobService.setToken(user.token);
            jobService.getAll().then((initialJobs) => {
                setJobs(initialJobs);
            });
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

    const addJob = (event) => {
        event.preventDefault();

        jobService.create(newJob).then((returnedJob) => {
            setJobs(jobs.concat(returnedJob));
            setNewJob({
                client: '',
                amount: '',
                paid: true,
                date: moment(),
            });
        });

        setIsFlyoutVisible(false);
    };

    const loginForm = () => {
        return (
            <EuiCard title="Login" className="component-background">
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
                <EuiPanel className="logged-card">
                    <LoggedIn user={user} handleLogout={handleLogout} />
                    <CreateJob
                        isFlyoutVisible={isFlyoutVisible}
                        setIsFlyoutVisible={setIsFlyoutVisible}
                        newJob={newJob}
                        setNewJob={setNewJob}
                        addJob={addJob}
                    />
                </EuiPanel>
                <JobsGrid jobs={jobs} setJobs={setJobs} />
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
