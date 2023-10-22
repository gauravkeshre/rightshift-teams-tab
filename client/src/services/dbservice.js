class DBService {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
    }

    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName);

            request.onerror = () => {
                reject(new Error(`Failed to open database ${this.dbName}`));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore(this.storeName, { keyPath: 'id' });
            };
        });
    }

    async close() {
        this.db.close();
        this.db = null;
    }

    async add(data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(data);

            request.onerror = () => {
                reject(new Error(`Failed to add data to ${this.storeName}`));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    async get(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onerror = () => {
                reject(new Error(`Failed to get data from ${this.storeName}`));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onerror = () => {
                reject(new Error(`Failed to get all data from ${this.storeName}`));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    async update(data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(data);

            request.onerror = () => {
                reject(new Error(`Failed to update data in ${this.storeName}`));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onerror = () => {
                reject(new Error(`Failed to delete data from ${this.storeName}`));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
        });
    }
}
