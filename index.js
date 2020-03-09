const core = require('@actions/core');
const { existsSync, readFileSync } = require('fs');

run = async () => {
    try {
        const path = core.getInput("path", { required: true });
        if (!existsSync(path)) {
            throw new Error('file does not exist');
        }

        const content = readFileSync(path);
        const json = JSON.parse(content);

        Object.keys(json).map(key => {
            core.setOutput(key, json[key]);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
