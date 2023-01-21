import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, IconButton, InputAdornment } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ChangeEvent, useState } from 'react';
import { isOnlyAlphabet } from '~utils/helpers';

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (!(event.target.value == '') && !isOnlyAlphabet(event.target.value))
      setError(true);
    else setError(false);
  };

  const handleClickSearch = () => {
    if (error) return;
    onSearch(searchValue.toLowerCase());
  };

  return (
    <FormControl sx={{ m: 1, width: '20ch' }}>
      <OutlinedInput
        color='primary'
        id='search-box'
        type='text'
        value={searchValue}
        name='search'
        size='small'
        error={error}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickSearch}
            >
              <SearchIcon color='primary' />
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <Box
          component='span'
          sx={{
            fontWeight: 100,
            fontSize: 11,
            fontStyle: 'italic',
            color: 'red',
          }}
        >
          Xin nhap vao ki tu hop le
        </Box>
      )}
    </FormControl>
  );
};

export default SearchInput;
