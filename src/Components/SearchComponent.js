import React, { Component } from 'react';


class SearchBar extends Component {
    constructor() {
        super();
        this.onSearchChange = this.onSearchChange.bind(this);
      }

    state = {
        searchText: ''
    }

    onSearchChange = e => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        e.currentTarget.reset();
    }

    render() {
        return(
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    className="form-control"
                    onChange={this.onSearchChange}
                    name="search"
                    ref={(input) => this.query = input}
                    placeholder="Search..." />
                <button className="search-button" type="submit" id="submit">Search</button>
            </form>
        );
    }
}

export default SearchBar;