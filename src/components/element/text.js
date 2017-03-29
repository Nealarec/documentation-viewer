import React, { Component } from 'react';
import { loadFile } from 'config';

export default class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            visible: false,
        };
    }

    toggleVisible() {
        this.setState({
            visible: !this.state.visible
        });
    }

    componentDidMount() {
        var { files_path } = this.props;
        loadFile(files_path, 'utf-8').then((data) => {
            this.setState({ data })
        });
    }

    visible() {
        return this.state.visible || this.props.all_oppen;
    }

    render() {
        var visible = this.visible();
        var { name, description } = this.props;
        return (
            <div className="archive">
                <div className='name' onClick={e => this.toggleVisible()} >{name}</div>
                <div className='description' htmlFor="" >{description}</div>
                <pre className={visible ? '' : 'hidden'}>{this.state.data}</pre>
            </div>
        );
    }
}