import '../css/AllUrl.css';

import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { Table, Card } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';

const columns = [
    { name: "#" },
    { name: "Your URL" },
    { name: "Short URL" },
    { name: "Time" },
    { name: "Action" },
];

const AllUrl = () => {
    const [allUrl, setAllUrl] = useState([]);
    const navigate = useNavigate();

    const refreshData = () => {
        axios.get(process.env.REACT_APP_BASE_BACK + '/api/allurls')
            .then((res) => {
                if (res.data.logged) setAllUrl(res.data.urls);
                else navigate('/login');
            })
            .catch((err) => alert(err));
    }
    const [copy, setCopy] = useState(false);

    useEffect((err) => {
        if (err) console.error(err);
        else refreshData();
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [allUrl.length]); // Only re-run the effect if allUrl.length changes, or only []

    const handleDelete = (shortid) => {
        axios.delete(process.env.REACT_APP_BASE_BACK + '/api/delete/' + shortid)
            .then(() => refreshData())
            .catch((err) => alert(err))
    }

    const truncate = (str) => {
        return str.length > 15 ? str.substring(0, 20) + "..." : str;
    }

    const hostName = (url) => {
        return (new URL(url)).hostname;
    }

    const listUrl = allUrl.map((url, index) => (
        <tr>
            <td>
                <div style={{ margin: '0 10px 0 10px' }}>
                    {index + 1}
                </div>
            </td>

            <td key={url.original} >
                <div style={{ margin: '0 10px 0 10px' }}>

                    <a style={{ textDecoration: 'none' }}
                        href={url.original} target="_blank"
                        rel="noreferrer">
                        {truncate(hostName(url.original))}
                    </a>
                </div>
            </td>

            <td key={url.shortid}>
                <div style={{ margin: '0 10px 0 10px' }}>
                    <a style={{ textDecoration: 'none' }}
                        href={process.env.REACT_APP_BASE_BACK + '/' + url.shortid}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {process.env.REACT_APP_BASE_BACK + '/' + url.shortid}
                    </a>
                </div>
            </td>

            <td key={url.timeCreate}>
                <div style={{ margin: '0 10px 0 10px' }}>
                    {url.timeCreate}
                </div>
            </td>

            <td key={url._id}>
                <div style={{ margin: '0 10px 0 10px' }}>
                    <CopyToClipboard text={process.env.REACT_APP_BASE_BACK + '/' + url.shortid}
                        onCopy={() => {
                            setCopy(true)
                        }}
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
                    <AiOutlineCloseSquare color='red' className='action-icon' onClick={() => handleDelete(url.shortid)} />
                </div>
            </td>
        </tr>
    ))

    return (
        <>
            <div id='url-body'>
                <Card id='url-title'>
                    All URLs
                </Card>
                <Card id='url-card'>
                    <Table hover borderless>
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th scope='col'>
                                        <div style={{ margin: '0 10px 0 10px' }}>
                                            {column.name}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {listUrl}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </>
    )
}

export default AllUrl