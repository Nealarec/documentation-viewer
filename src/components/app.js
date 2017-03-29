import React, { Component } from 'react';
import Directory from './directory';
import { loadFile } from '../config';

import fs from 'fs';
import path from 'path';

export default class App extends Component {
    constructor(props) {
        super(props);
        var route = "";

        this.state = {
            route: '',
            document: '',
            directories: {},
            all_oppen: false,
        }
    }
    goInto(route) {
        this.setState({ route })
        scroll(0, 0);
    }

    getPath() {
        var { route } = this.state;
        var tmp = [];

        if (route.length) {
            var segments = route.split('/').map(segment => {
                tmp.push(segment);
                var str = tmp.join('/');
                var props = {
                    key: str,
                    className: "nav-bar-item",
                    onClick: e => this.goInto(str)
                }
                return <span { ...props } >{segment}</span>
            });
        } else {
            var segments = [];
        }

        var props = {
            key: 'mv',
            className: "nav-bar-item",
            onClick: e => this.goInto('')
        }

        return [
            <span { ...props } >Mabe Vission</span>,
            ...segments,
        ]
    }

    getDirectories() {
        var { route, directories } = this.state;
        if (route.length) {
            var segments = route.split('/');
            return segments.reduce((prev, segment) => {
                return prev[segment];
            }, directories);
        }

        return directories;
    }

    getRealPath() {
        var { route, document } = this.state;
        return path.resolve(path.dirname(document), route);
    }

    toggleAllOppen() {
        this.setState({ all_oppen: !this.state.all_oppen });
    }

    loadFlie({ files }) {
        var path = files[0].path;
        loadFile(path, 'utf-8').then(data => {
            this.setState({
                document: path,
                directories: JSON.parse(data),
            });
        }).catch(e => alert('error al cargar el archivo!!'))
    }
    reloadFlie(path) {
        loadFile(path, 'utf-8').then(data => {
            this.setState({
                document: path,
                directories: JSON.parse(data),
            });
        }).catch(e => alert('error al cargar el archivo!!'))
    }

    render() {
        var { route, all_oppen, document } = this.state;
        var props = {
            route,
            all_oppen,
            oppen: true,
            files_path: this.getRealPath(),
            goInto: r => this.goInto(r),
            objects: this.getDirectories(),
        }

        if (document.length) {
            return (
                <div className="class-name">
                    <span className="app-path">{this.getPath()}</span>
                    <div className="all-oppen">
                        <input
                            id="all-oppen"
                            type="checkbox"
                            checked={this.state.all_oppen}
                            onChange={e => this.toggleAllOppen()} />

                        <label htmlFor="all-oppen">Expanded</label>
                        <input type="button" onClick={e => this.reloadFlie(document)} value="Reload" />
                    </div>
                    <Directory { ...props } />
                </div>
            );
        } else {
            return <input type="file" onChange={e => this.loadFlie(e.target)} />
        }
    }
}
