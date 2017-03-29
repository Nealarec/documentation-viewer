import React, { Component } from 'react';
import { loadFile } from 'config';
import mime from 'mime';
import download from "downloadjs";

export default class Text extends Component {

    download() {
        var { files_path, name } = this.props;
        loadFile(files_path).then(data => {
            download(data, name, mime.lookup(files_path));
        })
    }

    render() {
        var { name, description } = this.props;
        return (
            <div className="archive">
                <span onClick={e => this.download()} >{name}</span>
                <label htmlFor="" >{description}</label>
                <span className="not-suported">Tipo de archivo no soportado</span>
            </div>
        );
    }
}