import { Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  data: any;
}

const BlogArticle = (props: Props) => {
  const { data } = props;

  return <Text fontSize="xl">{data?.article}</Text>;
};

export default BlogArticle;
