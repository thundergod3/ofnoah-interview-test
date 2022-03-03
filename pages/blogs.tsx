import { Box, Container, Spinner } from "@chakra-ui/react";
import BlogItem from "@components/BlogItem";
import BlogList from "@components/BlogList";
import React, { Fragment, useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";

import { useAuthentication } from "@contexts/AuthenticationContext";
import { db } from "../firebase";

import styles from "styles/Home.module.css";

interface BlogI {
  id: string;
  title: string;
  image: string;
  article: string;
}

const Blogs = () => {
  const [blogList, setBlogList] = useState<BlogI[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { checkAuthentication } = useAuthentication();

  const handleGetBlogList = async (snapshot) => {
    setLoading(true);

    const formatBlogList = [];

    snapshot.forEach((doc) =>
      formatBlogList.push({ ...doc.data(), id: doc.id })
    );

    setBlogList(formatBlogList);
    setLoading(false);
  };

  useEffect(() => {
    if (checkAuthentication === false) router.push("/login");
  }, [checkAuthentication]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "blogs"),
      async (snapshot) => {
        await handleGetBlogList(snapshot);

        return unsubscribe;
      }
    );
  }, []);

  return (
    <Box className={styles.container}>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxW="80vw">
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}>
            <BlogList>
              {blogList.map((blog) => (
                <Fragment key={blog.id}>
                  <BlogItem blog={blog} />
                </Fragment>
              ))}
            </BlogList>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Blogs;
