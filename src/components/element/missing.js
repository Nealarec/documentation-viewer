import React, { Component } from 'react';
import { loadFile } from 'config';
import mime from 'mime';
import download from "downloadjs";

export default class Text extends Component {

    render() {
        var { name, description } = this.props;
        return (
            <div className="archive">
                <span className="name">{name}</span>
                <label htmlFor="" >{description}</label>
                <span className="missing">No se a encontrado el archivo</span>
            </div>
        );
    }
}