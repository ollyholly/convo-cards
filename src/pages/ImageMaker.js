import React, { useState } from 'react';
import { Container, Box, Input, Button, Grid } from '@mui/material';
import { FaFileImage } from 'react-icons/fa';
import domtoimage from 'dom-to-image';
import {Resizable} from 're-resizable'
import Draggable from 'react-draggable'



const emojiList = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7Ki-ys2G_MMb_xCrY7nAf87F5ZiIOyCh4f5H_JCTTtMSMLCL'

const ImageMaker = () => {

  const [image, setImage] = useState(null);
  const [emojiText, setEmojiText] = useState('');
  const [result, setResult] = useState(null);

  // const [width, setWidth] = useState(50);
  // const [height, setHeight] = useState(50);
  // const [fontSize, setFontSize] = useState(24);
  // const [position, setPosition] = useState({ x: 0, y: 0 });



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiTextChange = (e) => {
    setEmojiText(e.target.value);
  };

  

  const handleSaveImage = () => {
    const node = document.getElementById('image-container');
    
    domtoimage.toPng(node)
      .then((dataUrl) => {
        setResult(dataUrl);
      })
      .catch((error) => {
        console.error('Error while saving image:', error);
      });
  };

  const handleEmojiClick = (emoji) => {
    setEmojiText(emoji);
  };




  
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          startAdornment={<FaFileImage />}
          disableUnderline
        />
      </Box>
      <Box my={4}>
        <Input
          placeholder="Enter emoji or text"
          value={emojiText}
          onChange={handleEmojiTextChange}
          fullWidth
        />
      </Box>
      <Box my={4}>
        <Grid container spacing={1}>
          {emojiList.map((emoji, index) => (
            <Grid item xs={3} key={index} onClick={() => handleEmojiClick(emoji)}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid #ccc"
                borderRadius="4px"
                p={1}
                style={{ cursor: 'pointer' }}
              >
                {emoji}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box my={4} id="image-container" position="relative">
      {image && (
        <img src={image} alt="Uploaded" style={{ width: '100%' }} />
      )}
      <Draggable>
      <Resizable
        defaultSize={{
          width: 200,
          height: 360
        }}
        style={{
          background: `url(${imageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        
      }}
        lockAspectRatio={true}
      >
          {emojiText}
      </Resizable>
    </Draggable>

    </Box>
      <Box my={4}>
        <Button variant="contained" onClick={handleSaveImage}>
          Save Image
        </Button>
      </Box>
      {result && (
        <Box my={4}>
          <a href={result} download="edited-image.png">
            Download Image
          </a>
        </Box>
      )}
    </Container>
  );
}

export default ImageMaker;
