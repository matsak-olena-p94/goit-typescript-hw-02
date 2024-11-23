import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <header className={css.header}>
            <form onSubmit={(event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;
                const query = (form.elements.namedItem('query') as HTMLInputElement).value;
                
                if (query.trim() === '') {
                    toast('Введіть текст для пошуку!');
                    return;
                }
                
                onSearch(query);
                form.reset();
            }}>
                <input
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={css.input}
                />
                <button type="submit">Search</button>
            </form>
            <Toaster />
        </header>
    );
}

export default SearchBar;