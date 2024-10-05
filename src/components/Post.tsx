import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IAccount } from '../lib/types';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export interface IProps{
    postId:number;
    handleClose : () => void;
    account : IAccount
}


export  function Post({postId, handleClose, account}:IProps) {

  const photo = account.posts.find(elm => elm.id == postId)?.picture;
  const likes = account.posts.find(elm => elm.id == postId)?.likes;

  console.log(photo);
  
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display : "flex", justifyContent : "space-between"}}>
            
            <Typography id="modal-modal-title" variant="h6" component="h2">   
              <div style={{
                backgroundImage :  `url('http://localhost:4002/${photo}')`,
                backgroundSize : "cover",
                backgroundPosition : "center",
                width : "450px",
                height : "450px"
              }}>  
            </div>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div style={{
                display : "flex",
                flexDirection : "column",
                justifyContent : "flex-start",
                marginLeft : "20px",
                maxHeight : "400px",
                overflowY : "auto"
              }}>
                {
                  likes?.map(like => <Typography key={like.id}>
                    <p>{like.name} {like.surname}</p>
                  </Typography>)
                }
              </div>
            </Typography>

          </div>
        </Box>
      </Modal>
    </div>
  );
}


