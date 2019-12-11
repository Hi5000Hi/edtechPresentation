import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "./firebase";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [netid, setNetid] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveUser = () => {
    db.collection("user").add({
      Netid: netid,
      Name: name,
      Department: department
    });
    setOpen(false);
  };

  return (
    <div style={{ alignSelf: "flex-end", marginTop: "15px" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Netid"
            fullWidth
            value={netid}
            onChange={e => {
              setNetid(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            multiline
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Department"
            fullWidth
            multiline
            value={department}
            onChange={event => {
              setDepartment(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
