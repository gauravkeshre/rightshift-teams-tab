class AttendanceService {
    constructor() {
        // Initialize attendance data
        this.attendanceData = [];
    }

    // Create a new attendance record
    createAttendanceRecord(userId) {
        const newRecord = {
            userId,
            punchInTime: new Date(),
            punchOutTime: null,
            breakStartTime: null,
            breakEndTime: null,
        };
        this.attendanceData.push(newRecord);
        return newRecord;
    }

    // Get attendance record by user ID
    getAttendanceRecord(userId) {
        return this.attendanceData.find(record => record.userId === userId);
    }

    // Update punch out time for attendance record
    updatePunchOutTime(userId) {
        const record = this.getAttendanceRecord(userId);
        if (record) {
            record.punchOutTime = new Date();
            return true;
        }
        return false;
    }

    // Update break start time for attendance record
    startBreak(userId) {
        const record = this.getAttendanceRecord(userId);
        if (record && !record.breakStartTime) {
            record.breakStartTime = new Date();
            return true;
        }
        return false;
    }

    // Update break end time for attendance record
    endBreak(userId) {
        const record = this.getAttendanceRecord(userId);
        if (record && record.breakStartTime && !record.breakEndTime) {
            record.breakEndTime = new Date();
            return true;
        }
        return false;
    }
}
