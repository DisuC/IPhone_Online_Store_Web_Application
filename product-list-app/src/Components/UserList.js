import React from 'react';
import { useFirestore } from '../hooks/userFirestore';

const UserList = () => {
    const { documents: users, loading, error } = useFirestore('users');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.first} {user.last} (Born: {user.born})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;