import fs from 'fs';

export function loadFile(files_path, charset = null) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fs.readFileSync(files_path, charset));
        } catch (e) {
            error.catch(e);
            reject(e)
        }
    });
}

export var error = {
    catch: e => console.log(e)
};