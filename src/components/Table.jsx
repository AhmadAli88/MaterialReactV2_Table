import React, { useMemo, useState, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { 
  Box, 
  Button, 
  MenuItem, 
  TextField
} from '@mui/material';
import { 
  AccountCircle, 
  FileDownload 
} from '@mui/icons-material';

// Sample data
const data = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    age: 30,
    status: 'Active',
    dateJoined: '2020-01-01',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    age: 25,
    status: 'Inactive',
    dateJoined: '2021-03-15',
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@example.com',
    age: 45,
    status: 'Pending',
    dateJoined: '2019-07-21',
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Clark',
    email: 'emily.clark@example.com',
    age: 32,
    status: 'Active',
    dateJoined: '2022-10-11',
  },
  {
    id: 5,
    firstName: 'Michael',
    lastName: 'Taylor',
    email: 'michael.taylor@example.com',
    age: 40,
    status: 'Inactive',
    dateJoined: '2018-04-05',
  },
  {
    id: 6,
    firstName: 'Olivia',
    lastName: 'Harris',
    email: 'olivia.harris@example.com',
    age: 29,
    status: 'Active',
    dateJoined: '2023-01-01',
  },
  {
    id: 7,
    firstName: 'William',
    lastName: 'Adams',
    email: 'william.adams@example.com',
    age: 55,
    status: 'Pending',
    dateJoined: '2017-12-25',
  },
  {
    id: 8,
    firstName: 'Sophia',
    lastName: 'White',
    email: 'sophia.white@example.com',
    age: 22,
    status: 'Active',
    dateJoined: '2021-08-14',
  },
  {
    id: 9,
    firstName: 'James',
    lastName: 'Garcia',
    email: 'james.garcia@example.com',
    age: 38,
    status: 'Inactive',
    dateJoined: '2020-06-10',
  },
  {
    id: 10,
    firstName: 'Isabella',
    lastName: 'Lee',
    email: 'isabella.lee@example.com',
    age: 33,
    status: 'Active',
    dateJoined: '2022-09-19',
  },
];


const MyTable = () => {
  // Declare the validationErrors state at the top
  const [validationErrors, setValidationErrors] = useState({});

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            // Set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            // Remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'age',
        header: 'Age',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key="Active" value="Active">
              Active
            </MenuItem>,
            <MenuItem key="Inactive" value="Inactive">
              Inactive
            </MenuItem>,
            <MenuItem key="Pending" value="Pending">
              Pending
            </MenuItem>,
          ],
        },
      },
      {
        accessorKey: 'dateJoined',
        header: 'Date Joined',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'text',  // Now a simple text input
        }),
        Cell: ({ cell }) => cell.getValue(),  // Keep it as plain text
      },
    ],
    [getCommonEditTextFieldProps],
  );

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      // Send/receive api updates here
      console.log(values);
      exitEditingMode();
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editingMode: 'modal',
    enableColumnOrdering: true,
    enableEditing: true,
    enableColumnFilters: true,
    enableColumnActions: true,
    enablePagination: true,
    manualPagination: true,  // Enable manual pagination
    rowCount: data.length,   // Specify total row count
    pageSizeOptions: [5, 10, 20], // Options for rows per page
    enableSorting: true,
    enableGlobalFilter: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableRowActions: true,
    enableGrouping: true,
    enablePinning: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    positionToolbarAlertBanner: 'bottom',
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button
          onClick={() => table.setEditingRow(row)}
          startIcon={<AccountCircle />}
        >
          Edit
        </Button>
        <Button color="error" onClick={() => console.log('Delete')}>
          Delete
        </Button>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
        <Button
          color="secondary"
          onClick={() => console.log('Create New Account')}
          variant="contained"
        >
          Create New Account
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => console.log('Export Data')}
          startIcon={<FileDownload />}
          variant="contained"
        >
          Export All Data
        </Button>
      </Box>
    ),
  });
  

  return <MaterialReactTable table={table} />;
};

export default MyTable;
