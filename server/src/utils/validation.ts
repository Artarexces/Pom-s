import zod from "zod";

export const userSchema = zod.object({
    username: zod.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    password: zod.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});


export type UserInput = zod.infer<typeof userSchema>;

export const validateUser = (data: any) => {
    return userSchema.safeParse(data);
}