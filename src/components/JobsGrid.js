import React, { useState } from 'react';
import { Comparators } from '@elastic/eui/es/services/sort';
import { EuiBasicTable, EuiLink, EuiHealth } from '@elastic/eui';

const JobsGrid = ({ jobs }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState('client');
    const [sortDirection, setSortDirection] = useState('asc');

    const onTableChange = ({ page = {}, sort = {} }) => {
        const { index: pageIndex, size: pageSize } = page;

        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);
    };

    const findJobs = (
        jobs,
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    ) => {
        let items;

        if (sortField) {
            items = jobs
                .slice(0)
                .sort(
                    Comparators.property(
                        sortField,
                        Comparators.default(sortDirection)
                    )
                );
        } else {
            items = jobs;
        }

        let pageOfItems;

        if (!pageIndex && !pageSize) {
            pageOfItems = items;
        } else {
            const startIndex = pageIndex * pageSize;
            pageOfItems = items.slice(
                startIndex,
                Math.min(startIndex + pageSize, items.length)
            );
        }

        return {
            pageOfItems,
            totalItemCount: items.length,
        };
    };

    const pageOfItems = findJobs(
        jobs,
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    ).pageOfItems;

    const totalItemCount = findJobs(
        jobs,
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    ).totalItemCount;

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
            sortable: true,
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

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount,
        pageSizeOptions: [3, 5, jobs.length],
    };

    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
        enableAllColumns: true,
        readOnly: false,
    };

    return (
        <EuiBasicTable
            items={pageOfItems}
            rowHeader="firstName"
            columns={columns}
            pagination={pagination}
            sorting={sorting}
            onChange={onTableChange}
        />
    );
};

export default JobsGrid;
