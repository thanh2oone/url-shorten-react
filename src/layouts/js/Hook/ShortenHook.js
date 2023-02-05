import '../css/ShortenControl.css';

import React, {useState} from 'react';
import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';

const Shorten = () => {
    const [original, setOriginal] = useState('');
    const [displayData, setDisplayData] = useState('');

    const getInput = (e) => {
        setOriginal(e.target.value);
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/shorten', {
            original: original
        });

        setDisplayData(res.data);
        setOriginal('');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card id='shorten-card'>
                    <div id='shorten-header'>
                        New URL
                    </div>
                    <div id='shorten-input'>
                        <Input placeholder="Your Link..." required
                            type="url" id='original'
                            value={original} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>
                    <div id='shorten-footer'>
                        <Button type='submit' onChange={handleSubmit}
                        >Shorten</Button>
                        <h4>
                            {displayData &&
                                <a href={displayData} target="_blank" rel="noreferrer">
                                    {displayData}
                                </a>
                            }
                        </h4>
                    </div>
                </Card>
            </form>
        </ >
    )
}

export default Shorten;