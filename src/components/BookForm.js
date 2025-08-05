import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { addBook, getBooks, updateBook } from '../services/bookService';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import './BookForm.css';
import { CenterFocusStrong } from '@mui/icons-material';

export default function BookForm({ edit }) {
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    coverUrl: ''
  });

  useEffect(() => {
    async function fetchBookForEdit() {
      if (edit && id) {
        try {
          const res = await getBooks();
          const b = res.data.find(x => x.id === +id);
          if (b) setBook(b);
          else {
            enqueueSnackbar('Book not found!', { variant: 'error' });
            nav('/mybooks');
          }
        } catch (error) {
          enqueueSnackbar('Failed to load book.', { variant: 'error' });
        }
      }
    }
    fetchBookForEdit();
  }, [edit, id, nav, enqueueSnackbar]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateBook(book.id, book);
        enqueueSnackbar('Book updated successfully!', { variant: 'success' });
      } else {
        await addBook(book);
        enqueueSnackbar('Book added!', { variant: 'success' });
      }
      nav('/mybooks');
    } catch (err) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  const handleClear = () => {
    setBook({ title: '', author: '', genre: '', year: '', coverUrl: '' });
  };

  return (
    <div className="book-form-wrapper">
      <form className="book-form-container" onSubmit={handleSubmit}>
        <h2
          style={{
            backgroundColor: '#0960b7ff', // Eye-catching blue
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            display: 'inline-block',
            marginBottom: '8px'
          }}
        >
          Add a new Book
        </h2>
        <h4>Fill in the details to add a new book to your collection</h4>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TextField
              label="Title *"
              name="title"
              value={book.title}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'rgba(215, 212, 212, 0.49)',
                  borderRadius: 8
                }
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author *"
              name="author"
              value={book.author}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'rgba(215, 212, 212, 0.49)',
                  borderRadius: 8
                }
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Genre *"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'rgba(215, 212, 212, 0.49)',
                  borderRadius: 8
                }
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CoverUrl *"
              name="coverUrl"
              value={book.coverUrl}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'rgba(215, 212, 212, 0.49)',
                  borderRadius: 8
                }
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Year of Publishing *"
              name="year"
              type="number"
              value={book.year}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: 'rgba(215, 212, 212, 0.49)',
                  borderRadius: 8
                }
              }}
              required
            />
          </Grid>
        </Grid>
        <div className="form-buttons">
          <Button variant="outlined" onClick={handleClear} className="clear-btn">
            CLEAR ALL
          </Button>
          <Button variant="contained" type="submit" className="add-btn">
            ADD 📖
          </Button>
        </div>
      </form>
    </div>
  );
}