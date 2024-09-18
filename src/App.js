import { useState } from 'react';
import './App.css';
import Button from '@mui/joy/Button';
import Popup from './Popup';
function App() {
  const [open,setOpen] = useState(false);
  return (
    <div className="container">
      <Button variant="outlined" onClick={()=>setOpen(true)} sx={{borderColor: '#232423',color:'#232423'}}>Save Segment</Button>
      <Popup open={open} setOpen={setOpen}/>
    </div>
  );
}

export default App;
