import { useState, createContext } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [selectedCompliance, setSelectedCompliance] = useState([]);
    const [dateOfIncident, setDateOfIncident] = useState('');
    const [libraryCard, setLibraryCard] = useState('');

    // const [suspendedUsers, setSuspendedUsers] = useState([
    //     {
    //         "id": 18,
    //         "user_id": "EMP2",
    //         "library_card_number": "LIB18",
    //         "name": "John Doe",
    //         "caution_money": "9900",
    //         "type": "Full Time",
    //         "department": "IT",
    //         "current_status": "Active",
    //         "suspend": true,
    //         "penalty": true,
    //         "open_delete": null
    //     }, {
    //         "id": 18,
    //         "user_id": "STUD2",
    //         "library_card_number": "LIB18",
    //         "name": "John Doe",
    //         "caution_money": "9900",
    //         "type": "Full Time",
    //         "department": "IT",
    //         "current_status": "Active",
    //         "suspend": true,
    //         "penalty": true,
    //         "open_delete": null
    //     }
    // ]);

    const [suspendedUsers, setSuspendedUsers] = useState([]);

    const [penaltyUsers, setPenaltyUsers] = useState([
        {
            "id": 11,
            "library_card_number": "LIB11",
            "name": "John Doe",
            "user_id": "STUD1",
            "type": "Full Time",
            "department": "IT",
            "current_status": "Active",
            "caution_money": "9900",
            "suspend": false,
            "penalty": true,
            "open_delete": null
        },
        {
            "id": 18,
            "library_card_number": "LIB18",
            "name": "John Doe",
            "user_id": "EMP2",
            "type": "Full Time",
            "department": "IT",
            "current_status": "Suspended",
            "caution_money": "9900",
            "suspend": true,
            "penalty": true,
            "open_delete": null
        },
        {
            "id": 11,
            "library_card_number": "LIB11",
            "name": "John Doe",
            "user_id": "STUD1",
            "type": "Full Time",
            "department": "IT",
            "current_status": "Active",
            "caution_money": "9900",
            "suspend": false,
            "penalty": true,
            "open_delete": null
        },
        {
            "id": 18,
            "library_card_number": "LIB18",
            "name": "John Doe",
            "user_id": "EMP2",
            "type": "Full Time",
            "department": "IT",
            "current_status": "Suspended",
            "caution_money": "9900",
            "suspend": true,
            "penalty": true,
            "open_delete": null
        }
    ]);

    // const [penaltyUsers, setPenaltyUsers] = useState([
    // ]);

    return (
        <UserContext.Provider value={{ suspendedUsers, setSuspendedUsers, penaltyUsers, setPenaltyUsers, dateOfIncident, setDateOfIncident, selectedCompliance, setSelectedCompliance, libraryCard, setLibraryCard }}>
            {children}
        </UserContext.Provider>
    )
}