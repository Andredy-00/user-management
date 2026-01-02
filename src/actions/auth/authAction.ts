'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if(error){
        console.error(error.message)
        if(error.message === "Email not confirmed"){
            redirect('/check-email')
        }
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}

export async function signUpAction(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data:signUpData, error } = await supabase.auth.signUp(data);

    if(error) {
        console.error("Auth error: ", error.message);
        redirect('/error');
    }

    // Si no hay session debe confirmar el email
    if(!signUpData.session){
        redirect('/check-email')
    }

    revalidatePath('/', 'layout');
    redirect('/account');
}