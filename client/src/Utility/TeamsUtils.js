import * as msteams from '@microsoft/teams-js';

let initializedPromise;
function ensureInitiliazed() {
    if (!initializedPromise) {
        initializedPromise = msteams.app.initialize();
    }
    return initializedPromise;
}