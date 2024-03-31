'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

export const Groups = () => {
    const supabase = createClientComponentClient()
    const [groups, setGroups] = useState([])

    const getGroups = async () => {
        const { data, error } = await supabase
            .from('group')
            .select(`
                name,
                permission!group_permission(name)
  `);
        setGroups(data)
    }

    useEffect(() => {
        getGroups()
    }, [])


    return (
        <div>
            <h2>Groups</h2>
            <div>groups: {groups?.length}</div>
        </div>
    );
};