import React from 'react';

import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getAuth } from '../store/actions';

const styles = theme => ({
    root: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
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
    },
    title: {
        display: 'flex',
        position: 'absolute',
    },
    button: {
        display: 'flex',
        marginLeft: 10,
    },
    error: {
        // display: 'flex',
        textAlign: 'center',
        color: '#f44336',
        width: '100%'
    },
    link: {
        textDecoration: 'none',
    }
});

class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAuth = this.handleAuth.bind(this);

        if (this.props.token)
            this.props.history.push('/list');
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value, error: null });
    };

    handleAuth() {
        const { getAuth } = this.props;
        getAuth(this.state.login, this.state.password)
            .then(() => {
                const { token, message } = this.props;
                console.log(token);
                if (!token) {
                    console.log(message)
                    this.setState({
                        loginError: message.username,
                        passError: message.password,
                    })
                } else {
                    this.props.history.push('/list');
                }
            })
    }

    render() {
        const classes = this.props.classes;
        const { loginError, passError } = this.state;
        console.log(this.state)
        console.log(this.props)
        return (
            <Grid container justify='center' className={classes.root}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <h1 className={classes.title}>TODO LIST</h1>
                        <form noValidate autoComplete="off" className={classes.form}>
                            <div className={classes.flexFields}>
                                <TextField
                                    id="login"
                                    label="Login"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    helperText={loginError ? loginError : ''}
                                    error={loginError ? true : false}
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    type="password"
                                    helperText={passError ? passError : ''}
                                    error={passError ? true : false}
                                />
                            </div>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAuth}>
                                Sign In
                            </Button>
                            <Link to={'/list'} className={classes.link}>
                                <Button color="primary" className={classes.button}>
                                    Without Auth
                                </Button>
                            </Link>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            
        );
    }
}

const mapStateToProps = state => ({
    message: state.todo.authError,
    token: state.todo.token,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getAuth: getAuth
}, dispatch)

export default compose(
    withStyles(styles, {
        name: 'Auth',
    }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
)(Auth);