const { z } = require('zod');

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email,
    password: z.string().min(1)
})

const loginSchema = z.object({
    email: z.string().email,
    password: z.string().min(1)
})

const todoSchema = z.object({
    title: z.string().min(1)
})

module.exports = {signupSchema, loginSchema,todoSchema }