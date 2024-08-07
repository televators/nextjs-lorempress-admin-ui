import PostTable from "@/components/posts/PostTable";
import BackButton from "@/components/BackButton";
import PostPagination from "@/components/posts/PostPagination";

const PostsPage = () => {
  return (
    <>
      <BackButton text='Back to dashboard' link='/' />
      <PostTable />
      <PostPagination />
    </>
  );
}

export default PostsPage;
