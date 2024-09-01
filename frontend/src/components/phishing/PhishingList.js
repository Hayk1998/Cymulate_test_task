import React from 'react';


const PhishingList = ({ list }) => {
    return (
        <div>
            <table className="attempt-table">
                <thead>
                <tr>
                    <th>Employee Email</th>
                    <th>Content</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {list.map((attempt, index) => (
                    <tr key={index} className="attempt-row">
                        <td>{attempt.employeeEmail}</td>
                        <td>{attempt.emailContent}</td>
                        <td>{attempt.phishingStatus ? 'Clicked!' : 'Pending'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PhishingList;
