import React, { useState } from 'react';
import { Box, Container, TextField, InputAdornment, Rating } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRatingFilter: (rating: number) => void;
  minRating: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRatingFilter, minRating }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    onRatingFilter(newValue || 0);
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-2/3">
            <TextField
              fullWidth
              placeholder="Search for charities..."
              value={searchInput}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-search text-gray-400"></i>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                  },
                },
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Min Rating:</span>
            <Rating
              value={minRating}
              onChange={handleRatingChange}
              precision={0.5}
              size="medium"
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default SearchBar;