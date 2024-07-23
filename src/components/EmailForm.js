import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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


export default function EmailForm(){

    const [content, setContent] = useState('');

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm('service_p512n45', 'template_c0nvbwh', form.current, {
            publicKey: '4QCcjpIbF5CjT6Okg',
        })
        .then(
            () => {
            console.log('SUCCESS!');
            },
            (error) => {
            console.log('FAILED...', error.text);
            },
        );
    };

    return (
        <form ref={form} onSubmit={sendEmail} className='emailform'>
            <div className='email-form-data-input-section'>
                <label>{`Name   `}</label>
                <input required type="text" name="user_name"/>
            </div>

            <div className='email-form-data-input-section'>
                <label>{`Email   `}</label>
                <input required type="email" name="user_email" />
            </div>

            <div className='email-form-data-input-section'>
                <label>Message</label><br/>
                <ReactQuill value={content} 
                        modules={modules} 
                        formats={formats}
                        onChange={newValue => setContent(newValue)}
                        bounds={'.email-form-data-input-section'}
                        style={{height:'150px'}}
                        required
                />
            </div>

            <input type="submit" value="SUBMIT" className='submit-contact-form'/>
        </form>
    );
}