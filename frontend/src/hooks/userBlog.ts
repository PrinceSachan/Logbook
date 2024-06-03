import { useEffect, useState } from "react"
import { Blogstype } from "./blog"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const useUserBlog = () => {
    const [loading, setLoading]= useState(true)
    const [blogs, setBlogs] = useState<Blogstype []>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/userBlog`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setBlogs(res.data.userBlog)
            setLoading(false)
        })
        .catch(err => {
            console.log(`Erri while fetching user blog ${err}`)
            setLoading(false)
        })
    }, [])

    return {
        loading, 
        blogs
    }
}