import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import axios from "axios";
import "./ContentModal.css";
import { img_300, unavailable, img_500, unavailableLandscape } from "../../config";
import { ClassNames } from "@emotion/react";
//import Carousel from "../Carousel/Carousel";

const API_KEY="e07a0c394bdeedde413d9b1e4ee9357e"

const style = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: 25,
    p: 4,
  },
};

export default function ContentModal({ children, media_type, id }) {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
    <div className="media">
    <button type="button"  onClick={handleOpen}>
      {children}
    </button>
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={ClassNames.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      
    >
      <Box sx={style.paper}>
     { content && ( 
     <div className="ContentModal">
      <img
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                
      </div>)}
      </Box>

    </Modal>
  </div>
  </>
  );
}


{/* <Typography id=
<Fade in={open}>
  <div sx={style.paper} >
  <h2 id="transition-modal-title">Transition modal</h2>
  <p id="transition-modal-description">react-transition-grpup animates me.</p>
  </div>
</Fade> */}