import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table.js';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true});

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const { currencies, totalPages } = data;
            this.setState({
                currencies, // same as currencies: currencies
                totalPages, // same as totalPages: totalPages
                loading: false,
            });
        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false
            });
        });
    }

    /*
        JS class methods are not bound by default
        If not explicitly bounded, "this" will be undefined 
        Class fields to modify callbacks (popular, but experimental):
        handlePaginationClick = (direction) => {
    */
    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        //Increment nextPage if direction var is next, otherwise decrement 
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        
        this.setState({ page: nextPage }, () => {
        /*
        this.setState({ page: nextPage });
        this.fetchCurrencies();

        Page gets updated before state gets set (page 2 will show page 1 results)
        AJAX call is async, so we need to send request only after state gets updated
        setState takes a CALLBACK as second argument
        Therefore, call fetchCurrencis() inside setState's callback
        to make sure first page state is updated before making ajax call
         */ 
            this.fetchCurrencies();
        });

    }

    render() {
        const {loading, error, currencies, page, totalPages } = this.state;
        /**
         * Same as
         * const loading = this.state.loading;
         * const error = this.state.error;
         * const currencies = this.state.currencies;
         */

        
        // Render only loading componenet if loading state is true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        // Render only error message if error occurred while fetching data
        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table 
                    currencies={currencies}
                />
            <Pagination 
                page={page}
                totalPages={totalPages}
                handlePaginationClick = {this.handlePaginationClick}
            />
            </div>    
        );
    }
}

export default List;