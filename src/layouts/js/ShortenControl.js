import '../css/ShortenControl.css';

import * as React from 'react';
import { Input, Button } from "@nextui-org/react";
import { Card } from 'reactstrap';

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
        const res = await fetch('http://localhost:5000/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                original: this.state.original,
                shortid: this.state.shortID,
                timeCreate: this.state.timeCreate
            })
        });

        const body = await res.text();
        this.setState({
            displayData: body
        });
    }

    async callAPI() {
        // const result = await fetch('/api/url', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'appication/json'
        //     }
        // });
        // const body = await result.json();

        // if (result.status !== 200) throw Error(body.message);
        // return body;
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
                            <Input clearable placeholder="Your Link..." required
                                type="url" id='original'
                                value={this.state.original} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>
                        <div id='shorten-footer'>
                            <Button type='submit' onChange={this.handleSubmit} auto flat
                            >Rút gọn</Button>
                            <div>
                                {this.state.displayData &&
                                    <a href={this.state.displayData} target="_blank" rel="noreferrer">
                                        {this.state.displayData}
                                    </a>
                                }
                            </div>
                        </div>
                    </Card>
                </form>
            </ >
        )
    }
}

export default ShortenControl