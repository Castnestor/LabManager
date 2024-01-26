import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ClientForm from "./ClientForm";
import TestForm from "./TestForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalInput({backgroundColor, fontcolor, inputType, buttonName}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        sx={{backgroundColor: backgroundColor,
        color: fontcolor}}
        onClick={handleOpen}
      >
        {buttonName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {inputType === "client" ? <ClientForm/> : <TestForm/>}
        </Box>
      </Modal>
    </div>
  );
}
