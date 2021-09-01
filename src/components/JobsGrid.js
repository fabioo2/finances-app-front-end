import React, { useState } from 'react';
import { Comparators } from '@elastic/eui/es/services/sort';
import { EuiBasicTable, EuiHealth, EuiPanel } from '@elastic/eui';

const JobsGrid = ({ jobs }) => {
    const [sortField, setSortField] = useState('client');
    const [sortDirection, setSortDirection] = useState('asc');

    const onTableChange = ({ sort = {} }) => {
        const { field: sortField, direction: sortDirection } = sort;

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
        null,
        null,
        sortField,
        sortDirection
    ).pageOfItems;

    const renderStatus = (paid) => {
        const color = paid ? 'danger' : 'success';
        const label = paid ? 'Issues' : 'Closed';
        return <EuiHealth color={color}>{label}</EuiHealth>;
    };

    const formatter = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    });

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
                <span>
                    {items
                        .reduce((a, b) => a + b.amount, 0)
                        .toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}{' '}
                </span>
            ),
        },
        {
            field: 'Status',
            name: 'Job Status',
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
                sorting={sorting}
                onChange={onTableChange}
            />
        </EuiPanel>
    );
};

export default JobsGrid;
