import './AllUrl.css';

import * as React from 'react';
import axios from 'axios';

class AllUrl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUrl: []
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // this.callAPI()
        //     .then(res => this.setState({ allUrl: res.urls }))
        //     .catch(err => console.log(err));
        axios.get('http://localhost:5000/api/url')
            .then(res => {
                this.setState({ allUrl: res.data.urls })
            })
            .catch(err => console.log(err))
    }

    callBackData() {
        setTimeout(() => {
            axios.get('http://localhost:5000/api/url').then(res => {
                this.setState({ allUrl: res.data.urls })
            })
        }, 70)
    }

    handleDelete(id) {
        // const result = await fetch('http://localhost:5000/delete/' + shortid, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'appication/json'
        //     }
        // });
        // const body = await result.json();

        // if (result.status !== 200) throw Error(body.message);
        // return body;
        axios.delete('http://localhost:5000/delete/' + id)
            .then((res) => {
                if (res.status === 200) {
                    // window.location.reload();
                    console.log("ID " + "`" + id + "`" + " deleted");
                } else Promise.reject();
            })
            .catch(err => console.log(err))
        this.callBackData();
    }

    truncate(str) {
        return str.length > 15 ? str.substring(0, 20) + "..." : str;
    }

    render() {
        const hostName = (url) => {
            return (new URL(url)).hostname;
        }

        const listUrl = this.state.allUrl.map((url, index) => (
            <tr>
                <td>{index + 1}</td>

                <td key={url.original} style={{ maxWidth: "150px" }}>
                    <a id="url-td"
                        href={url.original} target="_blank"
                        rel="noreferrer">
                        {this.truncate(hostName(url.original))}
                    </a>
                </td>

                <td key={url.shortid}>
                    <a id="url-td" href={process.env.REACT_APP_BASE_BACK + '/' + url.shortid} target="_blank" rel="noreferrer">
                        {process.env.REACT_APP_BASE_BACK + '/' + url.shortid}
                    </a>
                </td>

                <td id="url-td" key={url.timeCreate}>{url.timeCreate}</td>

                <td key={url._id}>
                    <button
                        onClick={() => this.handleDelete(url._id)}
                    />
                </td>
            </tr >
        ))

        return (
            <>
                <div id="cardUrl">
                    <div>
                        <div id="tableContainer">
                            <table >
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">URL gốc</th>
                                        <th scope="col">URL rút gọn</th>
                                        <th scope="col">Thời gian tạo</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {listUrl}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AllUrl;