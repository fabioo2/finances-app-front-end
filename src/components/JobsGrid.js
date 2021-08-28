import React, { useState } from 'react';

import { EuiBasicTable, EuiLink, EuiHealth } from '@elastic/eui';

const JobsGrid = ({ jobs }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const onTableChange = ({ page = {} }) => {
        const { index: pageIndex, size: pageSize } = page;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
    };

    const totalItemCount = jobs.length;

    const startIndex = pageIndex * pageSize;

    const pageOfItems = jobs.slice(
        startIndex,
        Math.min(startIndex + pageSize, jobs.length)
    );

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

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount,
        pageSizeOptions: [3, 5, jobs.length],
    };

    return (
        <EuiBasicTable
            items={pageOfItems}
            rowHeader="firstName"
            columns={columns}
            pagination={pagination}
            onChange={onTableChange}
        />
    );
};

export default JobsGrid;
