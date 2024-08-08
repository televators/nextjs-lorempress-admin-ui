'use client';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import BackButton from "@/components/BackButton";
import posts from '@/data/posts';

// Form schema for Zod
const formSchema = z.object( {
  title: z.string().min( 1, {
    message: 'Title is required',
  } ),
  body: z.string().min( 1, {
    message: 'Body is required',
  } ),
  author: z.string().min( 1, {
    message: 'Author is required',
  } ),
  date: z.string().min( 1, {
    message: 'Date is required',
  } ),
} );

interface PostEditPageProps {
  params: {
    id: string,
  }
}

const PostEditPage = ( { params }: PostEditPageProps ) => {
  const post = posts.find( ( post ) => post.id === params.id );

  const form = useForm<z.infer<typeof formSchema>>( {
    resolver: zodResolver( formSchema ),
    defaultValues: {
      title: post?.title || '',
      body: post?.body || '',
      author: post?.author || '',
      date: post?.date || '',
    }
  } );

  const handleSubmit = ( data: z.infer<typeof formSchema> ) => {
    console.log(data);

  };
  return (
    <>
      <BackButton text="Back to all posts" link="/posts" />

      <h3 className="text-2xl mb-4">Edit Post</h3>

      <Form { ...form }>
        <form onSubmit={ form.handleSubmit( handleSubmit ) } className='space-y-8'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Title</FormLabel>
                <FormControl>
                  <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Content</FormLabel>
                <FormControl>
                  <Textarea className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter post content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Author</FormLabel>
                <FormControl>
                  <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Date</FormLabel>
                <FormControl>
                  <Input className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0 dark:text-white' placeholder="Enter date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full dark:bg-slate-800 dark:text-white'>Update post</Button>
        </form>
      </Form>
    </>
  );
}

export default PostEditPage;
