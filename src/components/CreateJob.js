import React, { useState } from 'react';

import {
    EuiForm,
    EuiFlyout,
    EuiFlyoutBody,
    EuiFlyoutHeader,
    EuiButton,
    EuiTitle,
    EuiFieldText,
    EuiFormRow,
    EuiFieldNumber,
    EuiDatePicker,
    EuiSwitch,
    EuiSpacer,
} from '@elastic/eui';

const CreateJob = ({
    newJob,
    addJob,
    setNewJob,
    isFlyoutVisible,
    setIsFlyoutVisible,
}) => {
    const handleClientInputChange = (event) => {
        event.preventDefault();
        setNewJob((values) => ({
            ...values,
            client: event.target.value,
        }));
    };

    const handleAmountInputChange = (event) => {
        event.preventDefault();
        setNewJob((values) => ({
            ...values,
            amount: event.target.value,
        }));
    };

    const handleDateInputChange = (date) => {
        setNewJob((values) => ({
            ...values,
            date: date,
        }));
    };

    const handlePaidInputChange = (event) => {
        setNewJob((values) => ({
            ...values,
            paid: event.target.checked,
        }));
    };

    let flyout;

    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout
                ownFocus
                onClose={() => setIsFlyoutVisible(false)}
                aria-labelledby="flyoutTitle"
            >
                <EuiFlyoutHeader hasBorder>
                    <EuiTitle size="m">
                        <h2 id="flyoutTitle">Create a New Job</h2>
                    </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                    <EuiForm component="form" onSubmit={addJob}>
                        <EuiFormRow label="Client Name">
                            <EuiFieldText
                                name="username"
                                value={newJob.client}
                                onChange={handleClientInputChange}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Amount">
                            <EuiFieldNumber
                                placeholder="Enter $"
                                value={newJob.amount}
                                onChange={handleAmountInputChange}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Select a date">
                            <EuiDatePicker
                                selected={newJob.date}
                                onChange={handleDateInputChange}
                            />
                        </EuiFormRow>
                        <EuiFormRow label="Job Status">
                            <EuiSwitch
                                label="Closed"
                                checked={newJob.paid}
                                onChange={(event) =>
                                    handlePaidInputChange(event)
                                }
                            />
                        </EuiFormRow>
                        <EuiButton
                            color={'primary'}
                            type="submit"
                            style={{ marginBottom: '5px' }}
                        >
                            Create Job
                        </EuiButton>
                    </EuiForm>
                </EuiFlyoutBody>
            </EuiFlyout>
        );
    }

    return (
        <span>
            <EuiButton
                color="success"
                className="logged-button"
                onClick={() => setIsFlyoutVisible(true)}
            >
                Create Job
            </EuiButton>
            {flyout}
        </span>
    );
};

export default CreateJob;
