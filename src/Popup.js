import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { TextField } from '@mui/material';
import AddSchema from './AddSchema';
import { useState } from 'react';
function Popup({open,setOpen}) {
const [segmentName, setSegmentName] = useState("");
const [nameError, setNameError] = useState(false);
const handleChange = (event) => {
  if(event.target.value){
    setNameError(false)
  }
  setSegmentName(event.target.value);
};

return(
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        disableEscapeKeyDown={true}
        onClose={(_event, reason) => {
          if(reason === "closeClick"){
            setOpen(false);
          }
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            Saving Segment
          </Typography>
          <Typography textColor="text.textPrimary">
           Enter the Name of the Segment
          </Typography>
          <TextField
            value={segmentName}
            onChange={handleChange}
            placeholder="Name of the Segment"
            variant="outlined"
            sx={{ mt:1,width:'100%'}}
             size="small"
          />
          {nameError && <span className="error">Enter Segment Name</span>}
          <Typography textColor="text.textPrimary" sx={{ mt: 2 }}>
           To save your segment, you need to add the schemas to build the query
          </Typography>
          <AddSchema setOpen={setOpen} segmentName={segmentName} setNameError={setNameError}/>
        </Sheet>
      </Modal>
)
}

export default Popup