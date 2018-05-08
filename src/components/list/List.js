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
    }

    componentDidMount() {
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

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span>{percent}</span>
        }
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
                    renderChangePercent = {this.renderChangePercent}
                />
            <Pagination 
                page={page}
                totalPages={totalPages}
            />
            </div>    
        );
    }
}

export default List;