class WorkOrderService {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName);

            request.onerror = (event) => {
                reject(`Failed to open database: ${event.target.error}`);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                objectStore.createIndex('title', 'title', { unique: false });
                objectStore.createIndex('description', 'description', { unique: false });
                objectStore.createIndex('status', 'status', { unique: false });
            };
        });
    }

    async addWorkOrder(workOrder) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.add(workOrder);

            request.onerror = (event) => {
                reject(`Failed to add work order: ${event.target.error}`);
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
    }

    async removeWorkOrder(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.delete(id);

            request.onerror = (event) => {
                reject(`Failed to remove work order: ${event.target.error}`);
            };

            request.onsuccess = (event) => {
                resolve();
            };
        });
    }

    async editWorkOrder(workOrder) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.put(workOrder);

            request.onerror = (event) => {
                reject(`Failed to edit work order: ${event.target.error}`);
            };

            request.onsuccess = (event) => {
                resolve();
            };
        });
    }
}

const WorkOrder = {
    id: null,
    title: '',
    description: '',
    service: '',
    status: '',
    priority: '',
    date: '',
    timeCreated: '',
    timeLastUpdated: '',
    assignedTo: '',
    assignedBy: '',
    attachments: '',
    location:'',
};

const mockWorkOrders = [
    {
        id: 1,
        title: 'Fix bug on login page',
        subtitle: 'There is a bug on the login page that prevents users from logging in. Need to investigate and fix.',
    },
    {
        id: 2,
        title: 'Add new feature to dashboard',
        subtitle: 'Need to add a new feature to the dashboard that allows users to filter their data by date range.',
    },
    {
        id: 3,
        title: 'Update styling on profile page',
        subtitle: 'The styling on the profile page needs to be updated to match the new design.',
    },
    {
        id: 11,
        title: 'Fix bug on login page',
        subtitle: 'There is a bug on the login page that prevents users from logging in. Need to investigate and fix.',
    },
    {
        id: 22,
        title: 'Add new feature to dashboard',
        subtitle: 'Need to add a new feature to the dashboard that allows users to filter their data by date range.',
    },
    {
        id: 33,
        title: 'Update styling on profile page',
        subtitle: 'The styling on the profile page needs to be updated to match the new design.',
    },
    {
        id: 333,
        title: 'Update styling on profile page',
        subtitle: 'The styling on the profile page needs to be updated to match the new design.',
    },
    {
        id: 111,
        title: 'Fix bug on login page',
        subtitle: 'There is a bug on the login page that prevents users from logging in. Need to investigate and fix.',
    },
    {
        id: 222,
        title: 'Add new feature to dashboard',
        subtitle: 'Need to add a new feature to the dashboard that allows users to filter their data by date range.',
    },
    {
        id: 333,
        title: 'Update styling on profile page',
        subtitle: 'The styling on the profile page needs to be updated to match the new design.',
    },
];
export { WorkOrderService, WorkOrder, mockWorkOrders };
