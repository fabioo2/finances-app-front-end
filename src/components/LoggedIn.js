import React from 'react';
import { EuiButton, EuiPanel } from '@elastic/eui';

const LoggedIn = ({ user, handleLogout }) => {
    return (
        <EuiPanel className="logged-card">
            <EuiButton
                className="logged-button"
                color={'primary'}
                onClick={handleLogout}
                style={{
                    marginBottom: '5px',
                }}
            >
                Log Out
            </EuiButton>
        </EuiPanel>
    );
};

export default LoggedIn;
