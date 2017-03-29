import React, { Component } from 'react';
import Element from "../element";
import path from 'path';

export default class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oppen: false || this.props.oppen,
        };
    }

    toggleOppen() {
        this.setState({
            oppen: !this.state.oppen
        });
    }

    goInto(e) {
        var { props } = this;
        props.goInto(props.route);
    }

    onClick(onClick, onDblClick, delay) {
        var timeoutID = null;
        delay = delay || 250;
        return function (event) {
            if (!timeoutID) {
                timeoutID = setTimeout(function () {
                    onClick(event);
                    timeoutID = null
                }, delay);
            } else {
                timeoutID = clearTimeout(timeoutID);
                onDblClick(event);
            }
        };
    }

    isOppen() {
        return this.state.oppen || this.props.all_oppen;
    }

    render() {
        var {
            name,
            route,
            goInto,
            objects,
            all_oppen,
            files_path,
         } = this.props;
        return (
            <div className="directory">
                <span
                    className="directory-name"
                    onClick={this.onClick(e => this.toggleOppen(), e => this.goInto())} >{name}</span>
                <div className="directory-elements">
                    {this.isOppen() ? Object.keys(objects).map((name) => {
                        var element = objects[name];

                        if (typeof element == "string") {
                            var props = {
                                name,
                                all_oppen,
                                key: name,
                                description: element,
                                files_path: path.resolve(files_path, name),
                            }
                            return <Element { ...props } />
                        } else {
                            var props = {
                                name,
                                goInto,
                                all_oppen,
                                key: name,
                                objects: element,
                                oppen: false,
                                files_path: path.resolve(files_path, name),
                                route: route.length ? route + '/' + name : name
                            }

                            return <Directory {...props} />
                        }
                    }) : null}
                </div>
            </div>
        );
    }
}