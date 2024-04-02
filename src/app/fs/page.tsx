import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function FsPage() {
    const supabase = createServerComponentClient({ cookies })


    const { data, error } = await supabase
        .storage
        .from('images')
        .list('public', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })


    console.log('data', data)
// https://hbnabwxbfbtsmfogbyth.supabase.co/storage/v1/object/public/images/public/storage-backet-img.jpg

    return (
        <div>
            <h1>FS PAGE</h1>

            {data?.map(item => {
                return (
                    <div key={item.id}>
                        <div className="w-[250px] h-[250px]">
                            <img src={`https://hbnabwxbfbtsmfogbyth.supabase.co/storage/v1/object/public/images/public/${item.name}`} />
                        </div>
                    </div>
                )
            })}


        </div>
    )
}