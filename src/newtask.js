import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db } from "./firebase";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [priority, setpriority] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handlePriority = event => {
    setpriority(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTask = () => {
    db.collection("tasks").add({
      title: title,
      notes: notes,
      priority: priority
    });
    setOpen(false);
  };

  return (
    <div style={{ alignSelf: "flex-end", marginTop: "15px" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add a task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Notes"
            fullWidth
            multiline
            value={notes}
            onChange={event => {
              setNotes(event.target.value);
            }}
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} onChange={handlePriority}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"waiting"}>Waiting</MenuItem>
              <MenuItem value={"ongoing"}>Ongoing</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
