import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    cell: {
        paddingLeft: 5,
    },
    pagination: {
        paddingRight: 10,
        paddingBottom: 10,
    }
}));

const headCells = [
    { id: 'id', numeric: false, disablePadding: false, sorting: true, label: 'Id' },
    { id: 'task', numeric: true, disablePadding: false, sorting: true, label: 'Task' },
    { id: 'name', numeric: true, disablePadding: false, sorting: true, label: 'Name' },
    { id: 'email', numeric: true, disablePadding: false, sorting: true, label: 'E-mail' },
    { id: 'status', numeric: true, disablePadding: false, sorting: true, label: 'Status' },
    { id: 'controls', numeric: true, disablePadding: false, sorting: false, label: 'Controls' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;

    // console.log(props)
    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        className={classes.cell}
                        onClick={headCell.sorting ? () => props.handleSort(headCell.id) : null}
                    >
                        {headCell.sorting ?
                            <TableSortLabel
                                active={props.field === headCell.id}
                                direction={props.direction}
                            >
                                {headCell.label}
                                {props.field === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {props.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                            :
                            headCell.label
                        }
                        
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const handleChangePage = (event, newPage) => {
        // console.log('newPage', newPage);
        setPage(newPage)
        props.handleChangePage(newPage);
    };

    const rows = props.rows;

    const emptyRows = rowsPerPage - rows.length;

    // console.log(props);

    return (
        <div className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        classes={classes}
                        rowCount={rows.length}
                        handleSort={props.handleSort}
                        direction={props.direction}
                        field={props.field}
                    />
                    <TableBody>
                        { rows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                // console.log(row);
                                return (
                                    <TableRow
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="none" className={classes.cell}>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right" className={classes.cell}>{row.text }</TableCell>
                                        <TableCell align="right" className={classes.cell}>{row.username }</TableCell>
                                        <TableCell align="right" className={classes.cell}>{row.email}</TableCell>
                                        <TableCell align="right" className={classes.cell}>
                                            <IconButton aria-label="delete" className={classes.margin} onClick={() => props.handleEdit(row.id, row.text, row.status == 10 ? 0 : 10)}>
                                                {row.status == 10 ? <CheckBoxOutlinedIcon fontSize="small" /> : <CheckBoxOutlineBlankIcon fontSize="small" />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right" className={classes.cell}>
                                            <IconButton aria-label="delete" className={classes.margin} onClick={() => props.handleOpenDialog(row.id, row.text, row.status)}>
                                                <EditOutlinedIcon  fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={props.total || '0'}
                rowsPerPage={3}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                className={classes.pagination}
            />
        </div>
    );
}