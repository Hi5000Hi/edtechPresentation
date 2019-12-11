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
  const [model, setModel] = useState("");
  const [mse, setMSE] = useState("");
  const [serial, setSerial] = useState("");
  const [user, setUser] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveEquipment = () => {
    db.collection("equipment").add({
      mse: mse,
      serial: serial,
      model: model,
      user: user
    });
    setOpen(false);
  };

  return (
    <div style={{ alignSelf: "flex-end", marginTop: "15px" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add equipment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Equipment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ICN"
            fullWidth
            value={mse}
            onChange={e => {
              setMSE(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Serial"
            fullWidth
            multiline
            value={serial}
            onChange={event => {
              setSerial(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            multiline
            value={model}
            onChange={event => {
              setModel(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            label="User"
            fullWidth
            multiline
            value={user}
            onChange={event => {
              setUser(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEquipment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
