import React from 'react';

import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearToken, getTasks, addTask, editTask, changeToken } from '../store/actions';

import Table from '../components/Table';
import Snackbar from '../components/Snackbar';
import Dialog from '../components/Dialog';

import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    paperTitle: {
        display: 'flex',
        justifyContent: 'center',
        padding: '0',
        marginTop: 20,
    },
    paper: {
        display: 'flex',
        height: 250,
        justifyContent: 'center',
        padding: '0 50px',
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexFlow: 'column wrap',
        height: 250,
        width: '100%',
    },
    flexFields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 50,
    },
    textField: {
        display: 'flex',
        marginRight: 20,
        alignSelf: 'baseline',
    },
    title: {
        display: 'flex',
    },
    list: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    tools: {
        display: 'flex',
        padding: 20,
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        marginLeft: 'auto',
    },
    authButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#fff',
    },
    user: {
        position: 'absolute',
        top: 20,
        left: 140,
        padding: 7.5,
    }
});

class TodoList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            rows: [],
            username: '',
            email: '',
            text: '',
            page: 0,
            sort_field: 'id',
            sort_direction: 'asc',
        }

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.getTasksByPageAndSort = this.getTasksByPageAndSort.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleStorageChange = this.handleStorageChange.bind(this);

    }
    

    handleStorageChange(token) {
        const { changeToken } = this.props;
        token = JSON.parse(token);
        console.log('TOKEN', token);
        if (token != this.props.token) {
            changeToken(token);
            if (!token) {
                this.props.history.push('/');
            }
        }
            
    }

    getTasksByPageAndSort(page, field = this.state.sort_field, dir = this.state.sort_direction) {
        const { getTasks } = this.props;
        getTasks(page, field, dir)
            .then(() => {
                const { total } = this.props;
                this.setState({ total: total })
            })
    }

    componentDidMount() {
        this.getTasksByPageAndSort();
    }

    handleChangePage(page) {
        page = page + 1;
        this.getTasksByPageAndSort(page);
        this.setState({ page: page})
    }

    handleSignOut() {
        const { clearToken } = this.props;
        clearToken();
    }

    handleAddTask() {
        const { addTask } = this.props;
        this.setState({ barText: null, error: false})
        addTask(this.state.username, this.state.email, this.state.text)
            .then(() => {
                const { addTaskError } = this.props;
                if (addTaskError) {
                    this.setState({
                        usernameError: addTaskError.username,
                        emailError: addTaskError.email,
                        textError: addTaskError.text,
                    })
                } else {
                    this.getTasksByPageAndSort(this.state.page);
                    this.setState({
                        barText: 'Job Added'
                    })
                }
            })
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value, [event.target.id + 'Error']: null, barText: null});
    };

    handleSort(sort_field) {
        console.log(sort_field)
        let sort_direction = 'desc';
        if (sort_field == this.state.sort_field) {
            sort_direction = this.state.sort_direction === 'asc' ? 'desc' : 'asc';
        } else {
            sort_direction = 'desc';
        }

        this.setState({ sort_field, sort_direction });
        this.getTasksByPageAndSort(this.state.page, sort_field, sort_direction);
    }

    handleEdit(id, text, status) {
        const { editTask } = this.props;
        this.setState({ error: false, barText: null})
        editTask(id, text, status)
            .then(() => {
                const { editTaskError } = this.props;
                if (editTaskError) {
                    this.setState({
                        editError: editTaskError,
                        barText: editTaskError.token,
                        error: true,
                    })
                } else {
                    this.getTasksByPageAndSort(this.state.page);
                }
            })
    }

    handleOpenDialog(id, text, status) {
        this.setState({ openDialog: true, idDialog: id, textDialog: text, statusDialog: status })
    }

    handleCloseDialog(state) {
        this.setState({ openDialog: state, idDialog: null })
    }

    render() {
        const classes = this.props.classes;
        const { total, tasks, token } = this.props;
        const { usernameError, emailError, textError, barText, editError } = this.state;

        const update = this.handleStorageChange;

        window.addEventListener('storage', function (e) {
            update(localStorage.token);
        });

        // console.log(this.state);
        console.log(this.props);
        return (
            <>
                {token ?
                    <>
                        <Link to={'/'} className={classes.link}>
                            <Button variant="contained" className={classes.authButton} onClick={this.handleSignOut}>
                                Sign Out
                        </Button>
                        </Link>
                        <Paper className={classes.user}>{'Hello, ' + token.slice(0,10)}</Paper>
                    </>
                    :
                    <Link to={'/'} className={classes.link}>
                        <Button variant="contained" className={classes.authButton}>
                            Sign in
                        </Button>
                    </Link>
                }
                { barText && <Snackbar error={this.state.error} text={this.state.barText} /> }
                <Dialog open={this.state.openDialog} id={this.state.idDialog} text={this.state.textDialog} status={this.state.statusDialog} handleCloseDialog={this.handleCloseDialog} handleSubmit={this.handleEdit}/>

                <Grid container justify='center' className={classes.root}>
                    <Grid item xs={3}>
                        <Paper className={classes.paperTitle}>
                            <h1>TODO LIST</h1>
                        </Paper>
                    </Grid>
                    <Grid container justify='center'>
                        <Grid item xs={8}>
                            <Paper className={classes.list}>
                                <div className={classes.tools}>
                                    <TextField
                                        id="username"
                                        label="Username"
                                        className={classes.textField}
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        helperText={usernameError ? usernameError : ''}
                                        error={usernameError ? true : false}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        className={classes.textField}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        helperText={emailError ? emailError : ''}
                                        error={emailError ? true : false}
                                    />
                                    <TextField
                                        id="text"
                                        label="Text"
                                        className={classes.textField}
                                        value={this.state.text}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        helperText={textError ? textError : ''}
                                        error={textError ? true : false}
                                    />
                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddTask}>
                                        Add
                                    </Button>
                                </div>
                                <Table 
                                    rows={tasks} 
                                    total={total} 
                                    direction={this.state.sort_direction} 
                                    field={this.state.sort_field}
                                    handleChangePage={this.handleChangePage} 
                                    handleSort={this.handleSort} 
                                    handleEdit={this.handleEdit}
                                    handleOpenDialog={this.handleOpenDialog}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    token: state.todo.token,
    tasks: state.todo.tasks,
    total: state.todo.totalTasks,
    addTaskError: state.todo.addTaskError,
    editTaskError: state.todo.editTaskError,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    clearToken: clearToken,
    getTasks: getTasks,
    addTask: addTask,
    editTask: editTask,
    changeToken: changeToken,
}, dispatch)

export default compose(
    withStyles(styles, {
        name: 'TodoList',
    }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
)(TodoList);