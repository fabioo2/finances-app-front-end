import React from 'react';

import { EuiBasicTable, EuiLink, EuiHealth } from '@elastic/eui';

const JobsGrid = ({ jobs }) => {
    const renderStatus = (paid) => {
        const color = paid ? 'success' : 'danger';
        const label = paid ? 'Paid' : 'Not Paid';
        return <EuiHealth color={color}>{label}</EuiHealth>;
    };

    const columns = [
        {
            field: 'client',
            name: 'Client Name',
            truncateText: true,
        },
        {
            field: 'date',
            name: 'Date of Invoice',
            dataType: 'date',
            sortable: true,
        },
        {
            field: 'amount',
            name: 'Payment Due',
            dataType: 'number',
        },
        {
            field: 'paid',
            name: 'Payment Status',
            dataType: 'boolean',
            render: (paid) => renderStatus(paid),
        },
    ];

    const items = jobs;

    const getRowProps = (item) => {
        const { id } = item;
        return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => {},
        };
    };

    const getCellProps = (item, column) => {
        const { id } = item;
        const { field } = column;
        return {
            className: 'customCellClass',
            'data-test-subj': `cell-${id}-${field}`,
            textOnly: true,
        };
    };

    return (
        <EuiBasicTable
            items={items}
            rowHeader="firstName"
            columns={columns}
            rowProps={getRowProps}
            cellProps={getCellProps}
        />
    );
};

export default JobsGrid;
