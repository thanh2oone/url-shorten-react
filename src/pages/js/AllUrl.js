import '../css/AllUrl.css';

import React from 'react';
import axios from 'axios';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { BiEditAlt } from 'react-icons/bi';
import { Table, Card } from 'reactstrap';
import { useState, useEffect } from 'react';

const columns = [
    { name: "#" },
    { name: "Your URL" },
    { name: "Short URL" },
    { name: "Time" },
    { name: "Action" },
];

const AllUrl = () => {
    const [allUrl, setAllUrl] = useState([]);

    const refreshData = () => {
        axios.get(process.env.REACT_APP_BASE_BACK + '/api/url')
            .then((res) => {
                setAllUrl(res.data.urls);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        refreshData();
    }, [allUrl.length]); // Only re-run the effect if allUrl.length changes, or only []

    const handleDelete = (id) => {
        axios.delete(process.env.REACT_APP_BASE_BACK + '/api/delete/' + id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("ID " + id + " deleted");
                    refreshData();
                } else Promise.reject();
            })
            .catch(err => console.log(err))
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
                    <BiEditAlt color='#89C4E1' className='action-icon' />
                    <FiCopy color='#54B435' className='action-icon' />
                    <AiOutlineCloseSquare color='red' className='action-icon' onClick={() => handleDelete(url._id)} />
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