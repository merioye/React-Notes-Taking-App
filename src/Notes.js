import React from 'react';

const Notes = (props)=>{
    return props.notesList.map((note, ind)=>{
        return(
            <div className='note' key={ind}>
                <h3 className='note-title'> {note.title} </h3>
                <p className='note-text'> {note.text} </p>
                <button className='delete-note-btn' onClick={()=>{props.deleteNote(ind)}}><i className="fas fa-trash-alt" ></i></button>
            </div>
        );
    });
    
}

export default Notes;