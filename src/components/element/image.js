import React, { Component } from 'react';
import { loadFile } from 'config';
import mime from 'mime';
import Element from './element'

export default class Image extends Element {

    componentDidMount() {
        this.loadFile();
    }

    loadFile() {
        var { files_path } = this.props;
        loadFile(files_path).then((data) => {
            this.setState({ data })
        });
    }

    getImage() {
        var { data } = this.state;
        var { files_path } = this.props;
        if (data.length) {
            return `data:${mime.lookup(files_path)};base64,${new Buffer(data).toString('base64')}`
        } else {
            return "";
        }
    }

    render() {
        var visible = this.visible();
        var { name, description } = this.props;
        return (
            <div className="archive">
                <span className="name" onClick={e => this.toggleVisible()} >{this.getName()}</span>
                <label htmlFor="" >{description}</label>
                <img className={visible ? '' : 'hidden'} src={this.getImage()} />
            </div>
        );
    }
}