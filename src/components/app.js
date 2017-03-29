import React, { Component } from 'react';
import Directory from './directory';

import fs from 'fs';
import path from 'path';

export default class App extends Component {
    constructor(props) {
        super(props);
        var route = "";
        var directories = JSON.parse(fs.readFileSync(
            path.resolve("../document-master.json")
        ));

        this.state = {
            route: '',
            directories,
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
        var { route } = this.state;
        return path.resolve('../' + route);
    }

    toggleAllOppen() {
        this.setState({ all_oppen: !this.state.all_oppen });
    }

    render() {
        var { route, all_oppen } = this.state;
        var props = {
            route,
            all_oppen,
            oppen: true,
            files_path: this.getRealPath(),
            goInto: r => this.goInto(r),
            objects: this.getDirectories(),
        }
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
                </div>
                <Directory { ...props } />
            </div>
        );
    }
}
