import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

require("materialize-loader");
import 'sass';


import path from 'path';


var div = document.createElement('app');

render(<App />, div);

document.body.appendChild(div);

