import '../css/Shorten.css';

import { useState } from 'react';
import { Card, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';

const Shorten = () => {
    const [original, setOriginal] = useState('');
    const [displayData, setDisplayData] = useState('');

    const getInput = (e) => {
        setOriginal(e.target.value);
    }
    
    // eslint-disable-next-line
    const [copy, setCopy] = useState(false);

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
                        {displayData &&
                            <div >
                                <Alert color='success' style={{ margin: "20px 0 0 0 ", width: 'auto' }}>
                                    <p style={{ display: 'inline', margin: '0 10px 0 0' }}>{displayData}</p>
                                    <CopyToClipboard text={displayData}
                                        onCopy={() => {
                                            setCopy(true)
                                        }}
                                        style={{ display: 'inline' }}
                                    >
                                        <FiCopy color='#54B435' id='copy-url' className='action-icon' />
                                    </CopyToClipboard>

                                    <UncontrolledPopover
                                        placement="left"
                                        target="copy-url"
                                        trigger="focus"
                                    >
                                        <PopoverBody>
                                            Copied
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                </Alert>
                            </div>
                        }
                    </div>
                </Card>
            </form>
        </ >
    )
}

export default Shorten;