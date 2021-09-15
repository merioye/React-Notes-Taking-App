import React, { useState } from 'react';
import './App.css';
import Notes from './Notes';

const App = ()=>{
    // State variable to toggle the display of inputBox, addButton
    const [disp, setDisp] = useState('none');
    // State variable to toggle the height of noteAreaHeight
    const [noteAreaHeight, setNoteAreaHeight] = useState('130px');
    // State variable that will hold the current value of inputBox(title)
    const [noteTitle, setNoteTitle] = useState('');
    // State variable that will hold the current value of textarea(text)
    const [noteText, setNoteText] = useState('');
    // State variable that hold the list of notes(title+text)
    const [notes, setNotes] = useState([]);



    // Defining the display style of inputBox, addButton according to which value the disp state variable currently holds
    let displayStyle = {
        display: disp
    };
    // Defining the height style of noteTakingArea according to which value the noteAreaHeight state variable currently holds
    let noteAreaStyle = {
        height: noteAreaHeight
    };

    

    // Handler that will be called when the user clicks on noteTakingArea div
    const closeNoteArea = ()=>{
        setDisp('block');
        setNoteAreaHeight('230px');
    }
    // Handler that will be called when the user double clicks on noteTakingArea div
    const openNoteArea = ()=>{
        setDisp('none');
        setNoteAreaHeight('130px');
    }
    // Handler that will get the value of inputBox and update to the state variable
    const handleTitle = (e)=>{
        setNoteTitle(e.target.value);
    }
    // Handler that will get the value of textArea and update to the state variable
    const handleText = (e)=>{
        setNoteText(e.target.value);
    }
    // Handler that will add notes into notes list state variable when the user clicks on add button
    const addNote = ()=>{
        if(noteTitle.length>0 & noteText.length>0){
            setNotes([...notes, {title:noteTitle, text:noteText}]);
            setNoteTitle('');
            setNoteText('');
            // Storing updated notesList state in Local Storage
            localStorage.setItem('list',JSON.stringify([...notes, {title:noteTitle, text:noteText}]));
        }
        
    }
    // Handler that will remove notes from notes list state variable when the user clicks on delete button
    const deleteNote = (id)=>{
            // New notesList Array that will be updated in the Local Storage
            let arr = [];
            setNotes(notes.filter((note, ind)=>{
                // Eliminating the item that is beging deleted to bet store in arr Array
                if(ind!==id){
                    arr.push(note);
                }
                return ind!==id;
            }));
            // Storing updated notesList state in Local Storage
            localStorage.setItem('list',JSON.stringify(arr));
    }
    // Hander that will display the all available notes in Local Storage when the page is reloaded
    window.addEventListener('load', ()=>{
        let itemsList = JSON.parse(localStorage.getItem('list'));
        setNotes(itemsList);
    });
    return(
        <>
            <div className='header'>
                <div className='heading-wrapper'>
                    <i className="fas fa-notes-medical note-icon"></i>
                    <h1>Reminder App</h1>
                </div>
            </div>
            <div style={noteAreaStyle} className='note-taking-area' onClick={closeNoteArea} onDoubleClick={openNoteArea}>
                <input style={displayStyle} type='text' className='title' placeholder='Title' value={noteTitle} onChange={handleTitle}/>
                <textarea className='text' placeholder='Write a note...' value={noteText} onChange={handleText}></textarea>
                <button style={displayStyle} className='add-note-btn' onClick={addNote}>+</button>
            </div>
            <div className='notes-list-wrapper'>
                <Notes notesList={notes} deleteNote={deleteNote}/>
            </div>
        </>
    );
}

export default App;