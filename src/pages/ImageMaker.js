import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Input, Button, Grid } from '@mui/material';
import { FaFileImage } from 'react-icons/fa';
import domtoimage from 'dom-to-image';
import {Resizable} from 're-resizable'
import Draggable from 'react-draggable'



const emojiList = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];

// const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7Ki-ys2G_MMb_xCrY7nAf87F5ZiIOyCh4f5H_JCTTtMSMLCL'

const ImageMaker = () => {

  const [image, setImage] = useState(null);
  const [emojiText, setEmojiText] = useState('');
  const [result, setResult] = useState(null);

  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [fontSize, setFontSize] = useState(24);
  const [position, setPosition] = useState({ x: 0, y: 0 });



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

  // const handleEmojiTextChange = (e) => {
  //   setEmojiText(e.target.value);
  // };

  

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


  const contentRef = useRef(null);

  const updateHeightBasedOnContent = () => {
    if (contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      setHeight(contentRect.height);
      setHeight(contentRect.width + 10);
    }
  };

  useEffect(() => {
    updateHeightBasedOnContent();
  }, [emojiText, fontSize]);

  
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
      {/* <Box my={4}>
        <Input
          placeholder="Enter emoji or text"
          value={emojiText}
          onChange={handleEmojiTextChange}
          fullWidth
        />
      </Box> */}
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
        <Draggable
          onStop={(e, data) => {
            const newPosition = {
              x: position.x + data.deltaX,
              y: position.y + data.deltaY,
            };
            setPosition(newPosition);
          }}
        >
          <Box
            position="absolute"
            top={position.y}
            left={position.x}
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'transparent',
            }}
          >
            <Resizable
              size={{ width: width, height: height }}
              onResizeStop={(e, direction, ref, delta) => {
                setWidth(width + delta.width);
                setFontSize(fontSize + delta.width);
                updateHeightBasedOnContent();
              }}
              lockAspectRatio={true}
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  background: 'transparent',
                  overflow: 'visible',
                }}
              >
                <Box
                  ref={contentRef}
                  fontSize={fontSize}
                  whiteSpace="nowrap"
                  style={{
                    padding: '5px',
                  }}
                >
                  {emojiText}
                </Box>
              </Box>
            </Resizable>
          </Box>
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
