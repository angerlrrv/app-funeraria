import React from 'react';
import { Box, Alert, IconButton, Collapse, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
const MsgInfo = (props) => {
 
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.open}>
        <Alert
        color={props.color}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         {props.msg}
        </Alert>
      </Collapse>
     
    </Box>
  );
};

export default MsgInfo;
