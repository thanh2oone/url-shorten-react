import '../css/ShortenControl.css';

import * as React from 'react';
import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';

class ShortenControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            original: '',
            displayData: ''
        };
        this.getInput = this.getInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInput(e) {
        this.setState({
            original: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
       
        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/shorten', {
            original: this.state.original,
            shortid: this.state.shortID,
            timeCreate: this.state.timeCreate   
        })
        
        this.setState({
            displayData: res.data,
            original: ''
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Card id='shorten-card'>
                        <div id='shorten-header'>
                            New URL
                        </div>
                        <div id='shorten-input'>
                            <Input placeholder="Your Link..." required
                                type="url" id='original'
                                value={this.state.original} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>
                        <div id='shorten-footer'>
                            <Button type='submit' onChange={this.handleSubmit}
                            >Shorten</Button>
                            <h4>
                                {this.state.displayData &&
                                    <a href={this.state.displayData} target="_blank" rel="noreferrer">
                                        {this.state.displayData}
                                    </a>
                                }
                            </h4>
                        </div>
                    </Card>
                </form>
            </ >
        )
    }
}

export default ShortenControl;