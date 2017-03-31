import fs from 'fs';
import mime from 'mime';
import React, { Component } from 'react';

import Text from './text';
import Image from './image';
import Download from './dowload';
import Missing from './missing';

export default class Element extends Component {

    render() {
        var { files_path } = this.props;

        if (!fs.existsSync(files_path)) {
            return <Missing {...this.props} />
        }



        switch (mime.lookup(files_path).split('/')[0]) {
            case "image": {
                return <Image {...this.props} />
            }
            case "text": {
                return <Text {...this.props} />
            }
            default: {
                return <Download {...this.props} />
            }
        }
    }
}

