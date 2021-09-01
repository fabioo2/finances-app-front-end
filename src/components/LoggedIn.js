import React from 'react';
import { EuiButton } from '@elastic/eui';

const LoggedIn = ({ user, handleLogout }) => {
    return (
        <span>
            <EuiButton
                className="logged-button"
                color={'primary'}
                onClick={handleLogout}
            >
                Log Out
            </EuiButton>
        </span>
    );
};

export default LoggedIn;
