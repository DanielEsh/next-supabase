'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

export const Users = () => {
    const supabase = createClientComponentClient()
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const { data, error } = await supabase
            .from('user')
            .select(`
                *,
                user_group(*)
  `);
        setUsers(data)

        console.log('DATA', data)
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div>
            <h2>Users</h2>
            <div>users: {users?.length}</div>
        </div>
    );
};