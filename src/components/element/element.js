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
}