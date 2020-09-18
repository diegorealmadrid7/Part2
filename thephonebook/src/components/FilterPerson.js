import React from 'react'

const FilterPerson = (props) => {
    return (
        <div>
            filter shown with
            <input 
                value={props.newSearch}
                onChange={props.handleSearchChange}
            />
        </div>
    )
}

export default FilterPerson