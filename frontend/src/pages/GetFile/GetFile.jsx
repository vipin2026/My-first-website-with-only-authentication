import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './getfile.css';

export default function GetFile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedEmail = sessionStorage.getItem('email');
    const storedImage = sessionStorage.getItem('uploadedFile');
    const storedImageName = sessionStorage.getItem('uploadedFileName'); // Get the image file name

    if (storedName) {
      setName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedImage) {
      setImage(storedImage);
    }
    if (storedImageName) {
      setImageName(storedImageName); // Set the image file name to state
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result; 
        setImage(fileData);
        sessionStorage.setItem('uploadedFile', fileData);
        setImageName(file.name); // Set the file name to state
        sessionStorage.setItem('uploadedFileName', file.name); // Store the file name in session storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    navigate('/getfile');
  };
  const handleClear = ()=>{
    sessionStorage.clear();
    navigate('/file')
  }

  return (
    <> 
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <span>{imageName || 'No file selected'}</span> {/* Display file name or default text */}
        {image && <img src={image} alt="Uploaded" className="preview-image" />}
      </div>
      <button type="submit">Save</button>
    </form>
    <div>
      <button type="submit" onClick={handleClear}>Clear</button>
    </div>
</>
  );
}
