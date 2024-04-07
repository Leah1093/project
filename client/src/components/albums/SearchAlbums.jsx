import React, { useState, useEffect } from "react";
import Select from "react-select";
const SearchAlbums = ({ setAlbums, allAlbums, albums }) => {
    const [searchValue, setSearchValue] = useState()

    const selectOption = (e) => {
        setSearchValue(e)
        e === null && setAlbums(allAlbums)
    }

    const [loading, setLoading] = useState(false);


    const searchAlbumsOptions = [
        { value: 'id', label: 'id' },
        { value: 'title', label: 'title' }]

    const searchByOption = (element) => {
        element.preventDefault();
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        let tempAlbums = [];
        switch (element.target[0].name) {
            case "id":
                tempAlbums = allAlbums.filter(album => (searchValue.label != '' && album.id === element.target[0].value))
                break;
            case "title":
                tempAlbums = allAlbums.filter(album => (searchValue.label != '' && album.title === element.target[0].value))
        }
        element.target.reset()
        setAlbums(tempAlbums)
    }
    return (<>
        <Select
            placeholder='search albums by...'
            onChange={(e) => selectOption(e)}
            options={searchAlbumsOptions}
            isClearable
            isLoading={loading}
            isSearchable={true}
            getOptionLabel={(searchAlbumsOptions) => searchAlbumsOptions["label"]}
            getOptionValue={(searchAlbumsOptions) => searchAlbumsOptions["value"]} />
        {searchValue != null && <form onSubmit={searchByOption}>
            <input name={searchValue.label} placeholder={searchValue.label} />
            <input type="submit" value="search" />
        </form>}
    </>)
}
export default SearchAlbums
