import React, { Component } from 'react';
import { loadFile } from 'config';
import mime from 'mime';
import download from "downloadjs";
import Element from "./element";

export default class Text extends Element {

    render() {
        var { name, description } = this.props;
        return (
            <div className="archive">
                <span className="name">{this.getName()}</span>
                <label htmlFor="" >{description}</label>
                <span className="missing">No se a encontrado el archivo</span>
            </div>
        );
    }
}