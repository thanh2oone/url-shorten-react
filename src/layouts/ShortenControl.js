import './ShortenControl.css';

import * as React from 'react';
import { Input, Card } from "@nextui-org/react";

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
            <div className='container'>
                <form style={{}} onSubmit={this.handleSubmit}>
                    <Card css={{ mw: "500px" }}>
                        <Card.Header>
                            New URL
                        </Card.Header>
                        <Card.Body>
                            <Input clearable label="Name" placeholder="https://" required
                                type="url" color='primary' id='original' name='original'
                                value={this.state.original} onChange={this.getInput} />
                            <Card.Footer>
                                <button type='submit' onChange={this.handleSubmit}>Rút gọn</button>
                                <div style={{ float: 'left' }}>
                                    {this.state.displayData &&
                                        <a href={this.state.displayData} target="_blank" rel="noreferrer">
                                            {this.state.displayData}
                                        </a>
                                    }
                                </div>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </form>
            </div >
        )
    }
}

export default ShortenControl