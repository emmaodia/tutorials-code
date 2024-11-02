// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EmployeeLog {
    struct Employee {
        string name;
        address walletAddress;
        bool exists;
    }

    struct Attendance {
        uint256 signInTime;
        uint256 signOutTime;
    }

    address public admin;
    mapping(address => Employee) public employees;
    mapping(address => Attendance) public attendanceRecords;

    event EmployeeRegistered(string name, address walletAddress);
    event EmployeeSignedIn(address employee, uint256 signInTime);
    event EmployeeSignedOut(address employee, uint256 signOutTime);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyEmployee() {
        require(
            employees[msg.sender].exists,
            "Only registered employees can sign in or out"
        );
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerEmployee(
        string memory _name,
        address _walletAddress
    ) public onlyAdmin {
        require(
            !employees[_walletAddress].exists,
            "Employee already registered"
        );
        employees[_walletAddress] = Employee(_name, _walletAddress, true);

        emit EmployeeRegistered(_name, _walletAddress);
    }

    function signIn() public onlyEmployee {
        require(
            attendanceRecords[msg.sender].signInTime == 0,
            "Already signed in today"
        );
        attendanceRecords[msg.sender].signInTime = block.timestamp;

        emit EmployeeSignedIn(msg.sender, block.timestamp);
    }

    function signOut() public onlyEmployee {
        require(
            attendanceRecords[msg.sender].signInTime != 0,
            "You need to sign in first"
        );
        require(
            attendanceRecords[msg.sender].signOutTime == 0,
            "Already signed out today"
        );
        attendanceRecords[msg.sender].signOutTime = block.timestamp;

        emit EmployeeSignedOut(msg.sender, block.timestamp);
    }

    function getAttendance(
        address _employee
    ) public view returns (uint256, uint256) {
        return (
            attendanceRecords[_employee].signInTime,
            attendanceRecords[_employee].signOutTime
        );
    }
}
