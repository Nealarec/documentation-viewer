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
            projectName: '',
            all_oppen: false,
            beauty: false,
            time: new Date().getTime(),
        }
    }
    componentDidMount() {
        try {
            var file = sessionStorage.getItem('file');
            if (file.length) {
                this.prossesFile(file);
            }
        } catch (e) {

        }
    }
    goInto(route) {
        this.setState({ route })
        scroll(0, 0);
    }

    getPath() {
        var { route, projectName } = this.state;
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
            <span {...props}>{projectName}</span>,
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
    toggleBeauty() {
        this.setState({ beauty: !this.state.beauty });
    }

    loadFlie({ files }) {
        var path = files[0].path;
        this.prossesFile(path);
        sessionStorage.setItem('file', path);
    }

    prossesFile(path) {
        loadFile(path, 'utf-8').then(data => {
            var data = JSON.parse(data);
            var projectName = Object.keys(data)[0];
            this.setState({
                document: path,
                projectName,
                directories: data[projectName],
                time: new Date().getTime(),
            });
        }).catch(e => alert('error al cargar el archivo!!'))
    }

    render() {
        var { route, all_oppen, document, beauty, time } = this.state;
        var props = {
            time,
            route,
            beauty,
            all_oppen,
            oppen: true,
            files_path: this.getRealPath(),
            goInto: r => this.goInto(r),
            objects: this.getDirectories(),
        }

        if (document.length) {
            return (
                <div className="class-name">
                    <navigator id="pageHeader">
                        <span className="app-path">{this.getPath()}</span>
                        <div className="all-oppen">
                            <input
                                id="all-oppen"
                                type="checkbox"
                                checked={all_oppen}
                                onChange={e => this.toggleAllOppen()} />

                            <label htmlFor="all-oppen">Expanded</label>
                        </div>
                        <div className="all-oppen">
                            <input
                                id="beauty"
                                type="checkbox"
                                checked={beauty}
                                onChange={e => this.toggleBeauty()} />

                            <label htmlFor="beauty">Beauty</label>
                        </div>
                        <input className="reload" type="button" onClick={e => this.prossesFile(document)} value="Reload" />
                        <input className="reload" type="button" onClick={e => {
                            this.setState({ all_oppen: true, beauty: true });
                            setTimeout(() => window.print(), 600);
                            setTimeout(e => this.setState({ all_oppen, beauty }), 700);
                        }} value="Print" />
                    </navigator>
                    <Directory { ...props } />
                </div>
            );
        } else {
            return (
                <div className="file-loader">
                    <input value="Cargar Documento Maestro" type="button" onClick={e => this.refs.loadFile.click()} />
                    <input type="file" ref="loadFile" onChange={e => this.loadFlie(e.target)} />
                </div>
            )
        }
    }
}
