/* Developer - Jayash Todi
Developed for Klikshik as an assignment for a front end role.*/
import './App.css';
import Carousel from './Components/Carousel';
import { useEffect, useState } from 'react';
import Card from './Components/Card';

function App() {

  const [timeLeft, setTimeLeft] = useState(5); // Timer starts from 5 seconds
  const [isRunning, setIsRunning] = useState(false); // To control the start, pause, and resume
  const [uploadedImageList, updateUploadedImageList] = useState([]); // To store uploaded images
  const [image,updateImage] = useState(null); // To store current image
  const [thumbnail, updateThumbnail] = useState(""); // To store current thumbnail

  // Function to validate allowed file types
  const isValidFileType = (fileUrl) => {
    let fileType = fileUrl.split('.').pop();
    if ( fileType === "jpg" || fileType === "jpeg" || fileType === "png" ) {
      return true;
    }
    return false;
  }

  // Handle storing of currently selected file
  const handleChange = (event) => {
    const fileUrl = event.target.value;
    // Validation for allowed file type
    if ( !isValidFileType(fileUrl) ) {
      alert("Wrong file type selected! Allowed file types are .jpg, .jpeg & .png");
      return;
    }
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    updateImage(imageUrl);
  }

  // Handle storing of thumbnail of uploaded image
  const handleThumbnailChange = (event) => {
    const thumbnail = event.target.value;
    updateThumbnail(thumbnail);
  }

  // Handle submit of uploaded image
  const handleSubmit = () => {
    if ( thumbnail.length === 0 ) {
      alert("Thumbnail empty!");
      return;
    }
    if (!image) {
      alert("Image not selected");
      return;
    }
    if (timeLeft > 0) {
      handleUploadClick();
    }
    if (timeLeft === 0) {
      updateUploadedImageList([...uploadedImageList,{src:image,thumbnail:thumbnail}]);
      setTimeLeft(5);
      setIsRunning(false);
    }
  }

  // Handle starting or resuming the timer
  const handleUploadClick = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  // Handle pausing the timer
  const handlePauseClick = () => {
    setIsRunning(false);
  };

  const handlePauseResumeButtonCLick = () => {
    if (isRunning) handlePauseClick();
    else handleUploadClick();
  }

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      // Create an interval when isRunning is true
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      handleSubmit();
    }
    // Clear the interval when timeLeft reaches 0 or when paused
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <div className="App">
      <div className="inputs">
        <input type='file' onChange={(e)=>handleChange(e)}/>
        <input className='text-input' type='text' placeholder='Thumbnail' onChange={(e)=>handleThumbnailChange(e)}/>
        <button onClick={handleSubmit} >Upload</button>
        {(timeLeft>0 && isRunning) || (timeLeft!==5 && !isRunning) ?
        <>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(5-timeLeft)*20}%` }}>
              <span className="progress-text">{(5-timeLeft)*20}%</span>
            </div>
          </div>
          <button onClick={handlePauseResumeButtonCLick}>{isRunning?"Pause":"Resume"}</button>
        </>
        :<></>}
      </div>
      <Carousel/>
      <p><b><u>Uploaded Images</u></b></p>
      <div className='uploaded-images'>
        {uploadedImageList.length>0 ? uploadedImageList.map((item)=><Card className="app-card" data={item}/>):<></>}
      </div>
    </div>
  );
}

export default App;
