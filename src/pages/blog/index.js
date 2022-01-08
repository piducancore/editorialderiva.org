/** @jsx jsx */
import { jsx, Themed, Box } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import BlogRoll from "../../components/blogroll"

export default function Blog(props) {
  const posts = props.data.allContentfulBlogPost.nodes
  return (
    <Layout {...props}>
      <Box sx={{ maxWidth: "blog", mx: "auto" }}>
        <Themed.h1>Blog</Themed.h1>
        <Themed.p>
          This barebones starter ships with the main Gatsby configuration files
          you might need.
        </Themed.p>
      </Box>
      <BlogRoll items={posts} />
    </Layout>
  )
}

export const query = graphql`
  query BlogRollQuery {
    allContentfulBlogPost(sort: { order: DESC, fields: date }) {
      nodes {
        id
        title
        date(formatString: "D MMMM YYYY", locale: "es")
        description
      }
    }
  }
`