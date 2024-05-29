import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Blogtype {
    "id": number;
    "title": string
    "content":string
    "author": {
        "name": string
    },
    "createdAt": string
}
export const useBlogs = () => {
    const [loading, setLoading]= useState(true)
    const [blogs, setBlogs] = useState<Blogtype []>()

    const bulkblog = async() => {
        try{
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(response => {
                    console.log(blogs)
                    setBlogs(response.data.bulkBlog)
                    setLoading(false)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
    //         headers: {
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //         .then(response => {
    //             console.log(blogs)
    //             setBlogs(response.data.bulkBlog)
    //             setLoading(false)
    //         })
    // }, [])

    return {
        loading,
        blogs,
        bulkblog,
    }
}