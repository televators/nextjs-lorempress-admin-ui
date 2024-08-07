import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableCaption } from '@/components/ui/table';
import Link from 'next/link';
import posts from '@/data/posts';
import { Post } from '@/types/posts';

interface PostTableProps {
  limit?: number;
  title?: string;
  showViewAll?: boolean;
}

const PostTable = ( { limit, title, showViewAll = false }: PostTableProps ) => {
  // Sort posts in descending order by date
  const sortedPosts: Post[] = [...posts].sort( ( a, b ) => new Date( b.date ).getTime() - new Date( a.date ).getTime() );

  // Filter posts to limit
  const filteredPosts: Post[] = limit ? sortedPosts.slice( 0, limit ) : sortedPosts;

  return (
    <div className="mt-10">
      <div className="flex flex-row items-center mb-4">
      <h3 className="text-2xl mr-5 font-semibold">
        { title ? title : 'Posts' }
      </h3>

      { showViewAll && (
        <Link href="/posts">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-xs">View All</button>
        </Link>
      ) }
      </div>

      <Table>
        <TableCaption>A list of recent posts</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className='hidden md:table-cell'>Author</TableHead>
            <TableHead className='hidden md:table-cell text-right'>Date</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          { filteredPosts.map( ( post ) => (
            <TableRow key={ post.id }>
              <TableCell>
                { post.title }
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                { post.author }
              </TableCell>
              <TableCell className='hidden md:table-cell text-right'>
                { post.date }
              </TableCell>
              <TableCell className='hidden md:table-cell text-right'>
                <Link href={ `/posts/edit/${ post.id }` } >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">Edit</button>
                </Link>
              </TableCell>
            </TableRow>
          ) ) }
        </TableBody>
      </Table>
    </div>
  );
}

export default PostTable;
