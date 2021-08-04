import React from 'react';
import { EuiCallOut } from '@elastic/eui';

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <EuiCallOut title={message} color="danger" iconType="alert" />;
};

export default Notification;
