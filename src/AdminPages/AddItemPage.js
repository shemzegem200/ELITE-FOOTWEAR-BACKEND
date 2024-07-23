import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { htmlToText } from 'html-to-text';



// Modules for the toolbar
const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', /*'strike'*/],
      [ 'image', /*'video'*/],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', /*'code-block'*/],
     // [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      //[{ 'direction': 'rtl' }],
     // [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, /*{ 'background': [] }*/],
      //['clean']
    ],
    // Additional modules
   // emoji: true, // example additional module
    // Add more modules as needed
};

  // Formats supported by Quill
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'image', 'video',
    'list', 'bullet',
    'blockquote', 'code-block',
    'script', 'indent', 'direction',
    'size', 'color', 'background'
];


export function AddItemPage() {
    const [name, setName] = useState('');
    const [sizes, setSizes] = useState(['']);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photos, setPhotos] = useState(['', '', '']);

    const handleAddSize = () => {
        setSizes([...sizes, '']);
    };

    const handleSizeChange = (index, value) => {
        const newSizes = sizes.map((size, i) => (i === index ? value : size));
        setSizes(newSizes);
    };

    const handlePhotoChange = (index, value) => {
        const newPhotos = photos.map((photo, i) => (i === index ? value : photo));
        setPhotos(newPhotos);
    };

    const handleDescriptionChange = (htmlContent) => {
        let s = "";
        let count = 0;
        let flag = true;
        for (let char of htmlContent){
            console.log(char==='\n');
            if (char==='<' ||char==='>'){
                if (char==='>') count = count + 1;
                if (count%2==0) s+= '\n';
                flag = !flag;
                continue;
            }
            if (!flag) continue;
            else{
                
                s = s + char;

            }
        }
        return s;
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        // handle form submission
        const formData = {
            name,
            sizes,
            category,
            description,
            price,
            photos,
        };

        // Post the formData to the server
        fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                price: formData.price,
                photos: formData.photos,
                category: formData.category,
                sizes: formData.sizes,
                description: handleDescriptionChange(description),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item added:', data);
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <>
            <h1 style={{fontFamily:'nike-font', textAlign:'center', marginTop:'100px'}}>ADD ITEM</h1>
            <form onSubmit={handleSubmit} className='emailform'>
                <div className='email-form-data-input-section'>
                    <label>Shoe Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <label>Shoe Sizes:</label>
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    {sizes.map((size, index) => (
                        <input
                            key={index}
                            type="text"
                            value={size}
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                            required
                        />
                    ))}
                    </div>
                    <button type="button" onClick={handleAddSize}>Add Size</button>
                </div>

                <div className='email-form-data-input-section'>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <label>Description:</label>
                    <ReactQuill value={description} 
                        modules={modules} 
                        formats={formats}
                        onChange={setDescription}
                        bounds={'.email-form-data-input-section'}
                        // style={{height:'20px'}}
                        required
                />
                </div><br/>

                <div className='email-form-data-input-section'>
                    <label>Price:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            // If value is NaN or less than 0, set it to 0
                            setPrice(isNaN(value) || value < 0 ? 0 : value);
                        }}
                        required
                    />
                </div>

                <div className='email-form-data-input-section'>
                    <label>Photos (URLs):</label><br/><br/>
                    <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    {photos.map((photo, index) => (
                        <input
                            key={index}
                            type="text"
                            value={photo}
                            placeholder={`Photo URL ${index + 1}`}
                            onChange={(e) => handlePhotoChange(index, e.target.value)}
                            required
                        />
                    ))}
                    </div>
                </div>

                <button type="submit" className='submit-contact-form'>Add Item</button>
            </form>
        </>
    );
}
