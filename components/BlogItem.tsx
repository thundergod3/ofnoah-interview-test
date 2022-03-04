import {
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import useModal from "@hooks/useModal";

import BlogArticle from "./BlogArticle";

interface BlogI {
  title: string;
  image: string;
  article: string;
}

interface Props {
  blog: BlogI;
  rootProps?: StackProps;
}

const BlogItem = (props: Props) => {
  const { blog, rootProps } = props;
  const { title, image } = blog;

  const { open, Dialog } = useModal({
    usingHeader: true,
    modalBody: BlogArticle,
  });

  return (
    <>
      <Stack
        spacing={useBreakpointValue({ base: "4", md: "5" })}
        cursor="pointer"
        onClick={() =>
          open({
            title: title,
            data: blog,
          })
        }
        {...rootProps}>
        <Image
          src={image}
          alt={title}
          draggable="false"
          fallback={<Skeleton />}
          borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          width="210px"
          height={{
            base: "110px",
            md: "210px",
          }}
        />
        <Stack>
          <Stack spacing="1">
            <Text
              fontWeight="bold"
              fontSize="2xl"
              color={useColorModeValue("gray.700", "gray.400")}>
              {title}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      {Dialog()}
    </>
  );
};

export default BlogItem;
