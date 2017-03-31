import React, { Component } from 'react';
import { loadFile } from 'config';

export default class Element extends Component {
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

    visible() {
        return this.state.visible || this.props.all_oppen;
    }

    reload() {
        this.loadFile()
    }

    loadFile() { }

    componentWillReceiveProps(nextProps) {
        if (nextProps.time != this.props.time) {
            this.loadFile();
        }
    }

    getName() {
        var { beauty, name } = this.props;

        if (beauty) {
            return name.split('.')[0].split("_").join(' ').toUpperCase();
        } else {
            return name;
        }
    }
}