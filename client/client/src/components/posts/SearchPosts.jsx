import React, { useState } from "react";
import Select from "react-select";
const SearchPosts = ({ setPosts, allPosts, posts }) => {
    const [searchValue, setSearchValue] = useState()

    const selectOption = (e) => {
        setSearchValue(e)
        e === null && setPosts(allPosts)
    }

    const [loading, setLoading] = useState(false);


    const searchPostsOptions = [
        { value: 'id', label: 'id' },
        { value: 'title', label: 'title' }]

    const searchByOption = (element) => {
        element.preventDefault();
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        let tempPosts = [];
        switch (element.target[0].name) {
            case "id":
                tempPosts = allPosts.filter(post => (searchValue.label != '' && post.id === element.target[0].value))
                break;
            case "title":
                tempPosts = allPosts.filter(post => (searchValue.label != '' && post.title === element.target[0].value))
        }
        element.target.reset()
        setPosts(tempPosts)
    }
    return (<>
        <Select
            placeholder='search posts by...'
            onChange={(e) => selectOption(e)}
            options={searchPostsOptions}
            isClearable
            isLoading={loading}
            isSearchable={true}
            getOptionLabel={(searchPostsOptions) => searchPostsOptions["label"]}
            getOptionValue={(searchPostsOptions) => searchPostsOptions["value"]} />
        {searchValue != null && <form onSubmit={searchByOption}>
            <input name={searchValue.label} placeholder={searchValue.label} />
            <input type="submit" value="search" />
        </form>}
    </>)
}
export default SearchPosts