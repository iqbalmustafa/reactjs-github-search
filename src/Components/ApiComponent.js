import React, { Component } from 'react';
import SearchBar from './SearchComponent';

class ApiComponent extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            loading: true,
            items: []
        };
    }

    componentDidMount() {
        this.performSearch();
    }

    performSearch = (query = 'react') => {
        fetch(`https://api.github.com/search/repositories?per_page=100&amp;q=${query}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loading: false,
                        items: result.items
                    });
                })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        const { error, loading, items } = this.state;

        if (error) {
            return (<div>Error: {error.message}</div>);
        }
        else if (loading) {
            return (<div>Loading...</div>);
        }
        else {
            return (
                <div className="container">
                    <SearchBar onSearch={this.performSearch} />
                    <ul className="list-group">
                        {(items == null) ? <div>your search returns nothing!</div> : items.map(item => <li key={item.id} className="list-group-item">
                            <div>
                                Fullname: {item.full_name}
                            </div>
                            <div>
                                Description: {item.description}
                            </div>
                            <div>
                                Language: {item.language}
                            </div>
                            <div>
                                Star count: {item.stargazers_count}
                            </div>
                            <div>
                                Update Date: {item.updated_at}
                            </div></li>)}
                    </ul>
                </div>
            );
        }
    }
}
export default ApiComponent;