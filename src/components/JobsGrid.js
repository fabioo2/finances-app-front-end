import React, { useState } from 'react';
import { Comparators } from '@elastic/eui/es/services/sort';
import {
    EuiBasicTable,
    EuiHealth,
    EuiPanel,
    EuiFlexItem,
    EuiFlexGroup,
} from '@elastic/eui';

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
            footer: <em>Page totals:</em>,
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
            align: 'right',
            footer: ({ items }) => (
                <span>{items.reduce((a, b) => a + b.amount, 0)} </span>
            ),
        },
        {
            field: 'paid',
            name: 'Payment Status',
            align: 'right',
            dataType: 'boolean',
            render: (paid) => renderStatus(paid),
            footer: ({ items }) => (
                <span>
                    {items.filter((i) => !i.paid).length} unpaid invoices
                </span>
            ),
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
        <EuiPanel className="component-background table-panel">
            <EuiBasicTable
                className="table-background"
                items={pageOfItems}
                rowHeader="firstName"
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
        </EuiPanel>
    );
};

export default JobsGrid;
