import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    let [open, setOpen] = React.useState(false);
    let [text, setText] = React.useState({ ...props.text });

    open = props.open;

    React.useEffect(() => {
        setText(props.text);
    }, [props.text])

    const handleClose = () => {
        setOpen(false);
        props.handleCloseDialog(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        props.handleCloseDialog(false);
        props.handleSubmit(props.id, text, props.status);
    };

    const handleChange = (event) => {
        setText(event.target.value)
    };

    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit task #{props.id}</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="text"
                label="Text of task"
                fullWidth
                value={text}
                onChange={handleChange}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}