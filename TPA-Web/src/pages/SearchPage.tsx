import {useState} from 'react'
import Navbar from '../components/Navbar'
import SearchPost from '../components/search/SearchPost'
import SearchUser from '../components/search/SearchUser'

export default function SearchPage() {
    const [filterUser, setFilterUser] = useState(true)
    const [filterPost, setFilterPost] = useState(true)

    function activateAll(){
        setFilterUser(true)
        setFilterPost(true)
    }
    function activateFilterUser() {
        setFilterUser(true)
        setFilterPost(false)
    }
    function activateFilterPost() {
        setFilterPost(true)
        setFilterUser(false)
    }

    return (
        <div className='body bg-linkhedin'>
            <Navbar/>
            <div className="center-all">
                <div className="flex mt-5 justify-center">
                    {
                        filterPost && filterUser ?
                        <button className='bg-blue-300 mr-2' onClick={activateAll}>All</button>
                        :
                        <button className='mr-2' onClick={activateAll}>All</button>
                    }
                    {
                        filterPost && filterUser === false ?
                        <button className='bg-blue-300 mr-2' onClick={activateFilterPost}>Post</button>
                        :
                        <button className='mr-2' onClick={activateFilterPost}>Post</button>
                    }
                    {
                        filterUser && filterPost === false ?
                        <button className='bg-blue-300' onClick={activateFilterUser}>User</button>
                        :
                        <button onClick={activateFilterUser}>User</button>
                    }
                </div>
                <div className="flex w-full h-full justify-center">
                    {
                        filterUser &&
                        <div className="bg-white flex flex-col border-2 rounded-lg shadow-md mt-10 max-h-xs min-w-xs text-center mr-14">
                            <span className='font-bold text-xl m-3 border-bottom-2-grey pb-2'>Users</span>
                            <SearchUser/>
                        </div>
                    }
                    {
                        filterPost &&
                        <div className="bg-white flex flex-col border-2 rounded-lg shadow-md min-w-2xl mt-10 max-h-lg text-center">
                            <span className='font-bold text-xl m-3 border-bottom-2-grey pb-2'>Posts</span>
                            <SearchPost/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
