import React, { useState } from 'react';

import userService from '../services/user';

import {
    EuiForm,
    EuiFieldText,
    EuiButton,
    EuiFormRow,
    EuiFieldPassword,
} from '@elastic/eui';

const CreateUserForm = ({ setMessage, showWhenVisible }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [dual, setDual] = useState(true);

    const handleCreateUser = async (event) => {
        event.preventDefault();

        try {
            if (newPassword === confirmedPassword) {
                const newUser = {
                    name: newName,
                    username: newUsername,
                    password: newPassword,
                    jobs: [],
                };

                await userService.create(newUser);

                setMessage('User created Successfully');
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            } else {
                setMessage('Password must match');
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            }
        } catch {
            setMessage('Some shit happened');
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    return (
        <div style={showWhenVisible}>
            <EuiForm component="form" onSubmit={handleCreateUser}>
                <h2>Create New User</h2>

                <EuiFormRow label="full name">
                    <EuiFieldText
                        name="username"
                        value={newName}
                        onChange={({ target }) => setNewName(target.value)}
                    />
                </EuiFormRow>
                <EuiFormRow label="username">
                    <EuiFieldText
                        name="username"
                        value={newUsername}
                        onChange={({ target }) =>
                            setNewUsername(target.value)
                        }
                    />
                </EuiFormRow>

                <EuiFormRow label="password">
                    <EuiFieldPassword
                        type={dual ? 'dual' : undefined}
                        value={newPassword}
                        onChange={({ target }) =>
                            setNewPassword(target.value)
                        }
                    />
                </EuiFormRow>

                <EuiFormRow label="confirm password">
                    <EuiFieldPassword
                        type={dual ? 'dual' : undefined}
                        value={confirmedPassword}
                        onChange={({ target }) =>
                            setConfirmedPassword(target.value)
                        }
                    />
                </EuiFormRow>

                <EuiButton
                    color={'primary'}
                    type="submit"
                    style={{ marginBottom: '5px' }}
                >
                    Create Account
                </EuiButton>
            </EuiForm>
        </div>
    );
};

export default CreateUserForm;
