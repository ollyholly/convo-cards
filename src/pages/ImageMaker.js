import React, { useState } from 'react';
import { Container, Box, Input, Button } from '@mui/material';
import { FaFileImage } from 'react-icons/fa';
import domtoimage from 'dom-to-image';
// import html2canvas from 'html2canvas';


const ImageMaker = () => {

  const [image, setImage] = useState(null);
  const [emojiText, setEmojiText] = useState('');
  const [result, setResult] = useState(null);

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

  // const handleSaveImage = async () => {
  //   const node = document.getElementById('image-container');
  //   const canvas = await html2canvas(node);
  //   const dataUrl = canvas.toDataURL('image/png');
  //   setResult(dataUrl);
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
      <Box my={4} id="image-container" position="relative">
        {image && (
          <img src={image} alt="Uploaded" style={{ width: '100%' }} />
        )}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {emojiText}
        </Box>
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
