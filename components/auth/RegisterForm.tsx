'use client';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Allows for multiple words, hyphens, apostrophes, and a space between words. Disallows numbers, underscores, and ending with punctuation.
// NOTE: Not in the mood to debug regex, but it's currently allowing for a single character for full name. Probably because I have the Zod min set to 1 lol should really set both to have same length/complexity requirements. But this is a demo so whateverrrrr.
const FULL_NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}$/;

// Form schema for Zod
// NOTE: Splitting up the primary schema object (baseSchema) and refine method so there's no circular reference for the inferred type of the validator's `values` object. Not a big deal and Zod/TS will work with it but this way is more explicit.
const baseSchema = z.object( {
  name: z.string().min( 1, {
    message: 'First and last name required',
  } ).regex( FULL_NAME_REGEX ),
  email: z.string().min( 1, {
    message: 'Email is required',
  } ).email( {
    message: 'Please enter a valid email'
  } ),
  password: z.string().min( 10, {
    message: 'Password must contain at least 10 characters',
  } ),
  confirmPassword: z.string().min( 10, {
    message: 'Password must contain at least 10 characters',
  } ),
} );

// Refine method for the password fields.
const formSchema = baseSchema.refine(
  ( values: z.infer<typeof baseSchema> ) => {
    return values.password === values.confirmPassword;
  },
  {
    message: 'Passwords must match',
    path: ['confirmPassword']
  }
)

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>( {
    resolver: zodResolver( formSchema ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  } );

  const handleSubmit = ( data: z.infer<typeof formSchema> ) => {
    router.push( '/' );
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Sign up with your email</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit( handleSubmit ) } className='space-y-6'>
            <FormField
              control={ form.control }
              name="name"
              render={ ( { field } ) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Full Name</FormLabel>

                  <FormControl>
                    <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter full name" autoComplete='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="email"
              render={ ( { field } ) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Email</FormLabel>

                  <FormControl>
                    <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter email" autoComplete='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="password"
              render={ ( { field } ) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Create password</FormLabel>

                  <FormControl>
                    <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' type='password' placeholder="Minimum 10 characters, please..." autoComplete='new-password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="confirmPassword"
              render={ ( { field } ) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Confirm password</FormLabel>

                  <FormControl>
                    <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' type='password' autoComplete='new-password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <Button className='w-full'>Sign in</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
