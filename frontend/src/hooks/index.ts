import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Blogstype {
    "id": number;
    "title": string
    "content":string
    "author": {
        "name": string
    },
    "createdAt": string
}

// fetch specific blog by given id if user logged in
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading]= useState(true)
    const [blog, setBlog] = useState<Blogstype>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/:${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " +  localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog)
                setLoading(false)
            })
            .catch((err) => {
                console.log('Error while fetching blogs:', err)
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blog
    }
}

// fetch all blogs if user logged in
export const useBlogs = () => {
    const [loading, setLoading]= useState(true)
    const [blogs, setBlogs] = useState<Blogstype []>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " +  localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(blogs)
                setBlogs(response.data.bulkBlog)
                setLoading(false)
            })
            .catch((err) => {
                console.log('Error while fetching blogs:', err)
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blogs
    }
}