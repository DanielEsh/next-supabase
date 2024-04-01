'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

export const Users = () => {
    const supabase = createClientComponentClient()
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            // Получаем информацию о пользователе
            const { data: userData, error: userError } = await supabase
                .from('user')
                .select('id, first_name, username')
                .eq('id', '05cbc7f7-5abd-4159-81c1-d6433be326cb')
                .single();

            if (userError) {
                throw userError;
            }

            // Получаем группы пользователя
            const { data: userGroups, error: groupsError } = await supabase
                .from('user_group')
                .select('group_id')
                .eq('user_id', '05cbc7f7-5abd-4159-81c1-d6433be326cb');

            if (groupsError) {
                throw groupsError;
            }

            // Получаем разрешения для каждой группы
            const groupIds = userGroups.map(group => group.group_id);
            const { data: groupPermissions, error: permissionsError } = await supabase
                .from('group_permission')
                .select('group_id, permission_id')
                .in('group_id', groupIds);

            if (permissionsError) {
                throw permissionsError;
            }

            // Получаем информацию о разрешениях
            const permissionIds = groupPermissions.map(permission => permission.permission_id);
            const { data: permissionsData, error: permissionsDataError } = await supabase
                .from('permission')
                .select('name')
                .in('id', permissionIds);

            if (permissionsDataError) {
                throw permissionsDataError;
            }

            // Формируем и возвращаем результат
            const result = {
                user: userData,
                groups: userGroups,
                permissions: permissionsData
            };

            console.log('RESULT', result)

            return result;
        } catch (error) {
            console.error('Error fetching user groups and permissions:', error.message);
            return null;
        }

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