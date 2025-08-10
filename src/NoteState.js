// src/components/NoteState.js (updated)
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Helper function to check token expiration
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  };

  // Get all notes
  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!isTokenValid(token)) {
        localStorage.removeItem('token');
        throw new Error("Token expired or invalid");
      }

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Unexpected response format:", json);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
      if (error.message.includes("Token expired")) {
        props.showAlert("Session expired. Please login again.", "danger");
        // You might want to redirect to login here
      }
    }
  };

  // Add note function
  const addNote = async (title, description, tag) => {
    try {
      const token = localStorage.getItem('token');
      if (!isTokenValid(token)) {
        throw new Error("Token expired or invalid");
      }

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!isTokenValid(token)) {
        throw new Error("Token expired or invalid");
      }

      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = localStorage.getItem('token');
      if (!isTokenValid(token)) {
        throw new Error("Token expired or invalid");
      }

      if (!id) {
        console.error("Error: Note ID is missing in editNote");
        return false;
      }

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
      return true;
    } catch (error) {
      console.error("Error updating note:", error);
      return false;
    }
  };
   
  return (
    <NoteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;