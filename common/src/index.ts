import z from "zod";

// signup schema for zod
export const signupInput = z.object({
    email: z.string().email({ message: 'Email is required'}),
    password: z.string().min(6, { message: 'Password is required'}),
    name: z.string().min(1, { message: "Name is required"})
})

// signin schema for zod
export const signinInput = z.object({
    email: z.string().email({ message: 'Email is required'}),
    password: z.string().min(6, { message: 'Password is required'}),
})

// blog creation shcema
export const createBlogInput = z.object({
    title: z.string({ message: 'Title is required'}),
    content: z.string({ message: 'Content is required'}),
})

// blog update shcema
export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
})

// type inference for different schemas
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>