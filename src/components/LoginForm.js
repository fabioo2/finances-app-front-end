import React, { useState } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import Notification from '../components/Notification';

import {
    EuiForm,
    EuiFieldText,
    EuiButton,
    EuiFormRow,
    EuiFieldPassword,
} from '@elastic/eui';

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    message,
    setMessage,
}) => {
    const [visible, setVisible] = useState(false);
    const [buttonText, setButtonText] = useState('Create New Account');
    const [dual] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible);
        visible
            ? setButtonText('Create New Account')
            : setButtonText('Cancel');
    };

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    return (
        <div>
            <Notification message={message}></Notification>

            <CreateUserForm
                showWhenVisible={showWhenVisible}
                setMessage={setMessage}
                setButtonText={setButtonText}
            />

            <EuiForm
                component="form"
                style={hideWhenVisible}
                onSubmit={handleSubmit}
            >
                <EuiFormRow label="username">
                    <EuiFieldText
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </EuiFormRow>

                <EuiFormRow label="password">
                    <EuiFieldPassword
                        type={dual ? 'dual' : undefined}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </EuiFormRow>

                <EuiButton
                    color={'primary'}
                    type="submit"
                    style={{ marginBottom: '5px' }}
                >
                    Login
                </EuiButton>
            </EuiForm>

            <EuiButton color={'success'} onClick={toggleVisibility}>
                {buttonText}
            </EuiButton>
        </div>
    );
};

export default LoginForm;
